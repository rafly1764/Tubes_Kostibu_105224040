import KolomCatatan from "../../components/KolomCatatan";

// Template dipasang ulang (remount) setiap kali rute anak berganti.
export default function TemplateKos({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <KolomCatatan label="Catatan di Template" />
      {children}
    </div>
  );
}