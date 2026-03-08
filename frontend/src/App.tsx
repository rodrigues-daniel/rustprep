import { useState, useEffect, useCallback, useRef } from "react";
import type { User } from "./types/user";
import { usersApi } from "./api";
import { useUsers } from "./hooks/useUsers";
import { useToasts } from "./hooks/useToasts";
import { useBreakpoint } from "./hooks/useBreakpoint";
import { s } from "./styles";
import { UserForm } from "./components/UserForm";
import { UserRow } from "./components/UserRow";
import { DeleteModal } from "./components/DeleteModal";
import { EmptyState } from "./components/EmptyState";
import { ToastStack } from "./components/ToastStack";
import { Spinner } from "./components/Spinner";

export default function App() {
  const { users, loading, load } = useUsers();
  const { list: toasts, push: toast } = useToasts();
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<User | null>(null);
  const [deleting, setDeleting] = useState<User | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "" });
  const [drawerOpen, setDrawerOpen] = useState(false); // controle do drawer mobile
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    setForm(editing
      ? { nome: editing.nome, email: editing.email }
      : { nome: "", email: "" }
    );
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [editing]);

  // Abre o drawer ao iniciar edição no mobile
  useEffect(() => {
    if (isMobile && editing) setDrawerOpen(true);
  }, [editing, isMobile]);

  const handleChange = (field: "nome" | "email", value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async () => {
    if (!form.nome.trim() || !form.email.trim())
      return toast("Preencha nome e e-mail.", "warn");

    setBusy(true);
    try {
      const r = editing
        ? await usersApi.update(editing.id, form)
        : await usersApi.create(form);

      if (!r.ok) {
        const txt = await r.text();
        throw new Error(
          txt.includes("Email") || txt.includes("unique")
            ? "Este e-mail já está cadastrado."
            : "Erro ao salvar usuário."
        );
      }

      toast(editing ? `${form.nome} atualizado!` : `${form.nome} criado!`);
      setEditing(null);
      setDrawerOpen(false);
      load();
    } catch (e) {
      toast((e as Error).message, "err");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      await usersApi.delete(deleting.id);
      toast(`${deleting.nome} removido.`, "warn");
      setDeleting(null);
      if (editing?.id === deleting.id) {
        setEditing(null);
        setDrawerOpen(false);
      }
      load();
    } catch {
      toast("Erro ao remover.", "err");
    } finally {
      setBusy(false);
    }
  };

  const filtered = users.filter((u) =>
    u.nome.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const mainStyle = isMobile ? s.mainMobile : bp === "tablet" ? s.mainTablet : s.main;

  return (
    <div style={s.root}>

      {/* ── Sidebar / Drawer ── */}
      <UserForm
        editing={editing}
        form={form}
        busy={busy}
        bp={bp}
        inputRef={inputRef}
        totalUsers={users.length}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => { setEditing(null); setDrawerOpen(false); }}
        onDeleteClick={() => setDeleting(editing)}
        mobileOpen={drawerOpen}
        onMobileClose={() => setDrawerOpen(false)}
      />

      {/* ── Conteúdo principal ── */}
      <main style={mainStyle}>

        {/* Header mobile com logo + contador inline */}
        {isMobile && (
          <div style={s.headerMobile}>
            <div style={s.logoWrap}>
              <div style={s.logoDot} />
              <span style={s.logoText}>UserFlow</span>
            </div>
            <div style={{
              background: "#111526", border: "1px solid #1c2236",
              borderRadius: 10, padding: "6px 14px",
              fontSize: 12, color: "#4b5675",
            }}>
              <span style={{ color: "#4f6ef7", fontWeight: 700 }}>{users.length}</span>
              {" "}usuários
            </div>
          </div>
        )}

        {/* Barra de busca */}
        <div style={s.toolbar}>
          <div style={s.searchWrap}>
            <span style={s.searchIcon}>⌕</span>
            <input
              style={s.searchInput}
              placeholder="Buscar por nome ou e-mail…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button style={s.btnRefresh} onClick={load} title="Recarregar">↻</button>
        </div>

        {/* Lista */}
        <div style={s.listWrap}>
          {loading ? (
            <EmptyState bp={bp} icon={<Spinner size={32} />} title="Carregando…" />
          ) : filtered.length === 0 ? (
            <EmptyState
              bp={bp}
              icon={search ? "🔍" : "👤"}
              title={search ? "Nenhum resultado" : "Nenhum usuário ainda"}
              sub={search ? "Tente outro termo." : "Crie o primeiro pelo botão +"}
            />
          ) : (
            filtered.map((u, i) => (
              <UserRow
                key={u.id}
                user={u}
                selected={editing?.id === u.id}
                index={i}
                bp={bp}
                onEdit={() => setEditing(u)}
                onDelete={() => setDeleting(u)}
              />
            ))
          )}
        </div>
      </main>

      {/* ── FAB mobile — abre o drawer para criar ── */}
      {isMobile && (
        <button
          style={s.fab}
          onClick={() => { setEditing(null); setDrawerOpen(true); }}
          title="Novo usuário"
        >
          +
        </button>
      )}

      {/* ── Modal de confirmação ── */}
      {deleting && (
        <DeleteModal
          user={deleting}
          busy={busy}
          bp={bp}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}

      {/* ── Toasts ── */}
      <ToastStack toasts={toasts} bp={bp} />
    </div>
  );
}