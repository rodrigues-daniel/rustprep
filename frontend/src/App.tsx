import { useState, useEffect, useRef } from "react";
import type { User } from "./types/user";
import { usersApi } from "./api";
import { useUsers } from "./hooks/useUsers";
import { useToasts } from "./hooks/useToasts";
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

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<User | null>(null);
  const [deleting, setDeleting] = useState<User | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "" });
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Carrega ao montar
  useEffect(() => { load(); }, [load]);

  // Sincroniza form com usuário em edição
  useEffect(() => {
    setForm(editing
      ? { nome: editing.nome, email: editing.email }
      : { nome: "", email: "" }
    );
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [editing]);

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
      if (editing?.id === deleting.id) setEditing(null);
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

  return (
    <div style={s.root}>
      {/* Sidebar com formulário */}
      <UserForm
        editing={editing}
        form={form}
        busy={busy}
        inputRef={inputRef}
        totalUsers={users.length}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
        onDeleteClick={() => deleting && setDeleting(editing)}
      />

      {/* Área principal */}
      <main style={s.main}>
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

        {/* Lista de usuários */}
        <div style={s.listWrap}>
          {loading ? (
            <EmptyState icon={<Spinner size={32} />} title="Carregando…" />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={search ? "🔍" : "👤"}
              title={search ? "Nenhum resultado" : "Nenhum usuário ainda"}
              sub={search ? "Tente outro termo." : "Crie o primeiro pelo painel."}
            />
          ) : (
            filtered.map((u, i) => (
              <UserRow
                key={u.id}
                user={u}
                selected={editing?.id === u.id}
                index={i}
                onEdit={() => setEditing(u)}
                onDelete={() => setDeleting(u)}
              />
            ))
          )}
        </div>
      </main>

      {/* Modal de confirmação de deleção */}
      {deleting && (
        <DeleteModal
          user={deleting}
          busy={busy}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}

      {/* Notificações */}
      <ToastStack toasts={toasts} />
    </div>
  );
}

