import { ButtonLink } from "./Button";

type Props = {
  title: string;
  message: string;
  action: { href: string; label: string };
};

export function EmptyState({ title, message, action }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line px-6 py-16 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="max-w-sm text-sm text-muted">{message}</p>
      <ButtonLink href={action.href} variant="secondary" className="mt-2">
        {action.label}
      </ButtonLink>
    </div>
  );
}