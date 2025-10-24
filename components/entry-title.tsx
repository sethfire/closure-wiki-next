export default function EntryTitle({ title, caption, icon }: { title: string; caption: string; icon?: string }) {
  return (
    <div className="flex items-start gap-4 mb-4">
      {icon && (
        <img 
          src={icon}
          className="w-16 h-16 rounded shrink-0 aspect-square object-contain bg-muted"
        />
      )}
      <div>
        <h1 className="text-2xl font-semibold mb-2">{title}</h1>
        <p className="text-sm text-muted-foreground">{caption}</p>
      </div>
    </div>
  );
}