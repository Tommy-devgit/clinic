import { Modal } from "@/components/ui/Modal";

export function DoctorProfileModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Doctor Profile">
      <p className="text-sm text-slate-700">Detailed doctor profile will be shown here.</p>
    </Modal>
  );
}
