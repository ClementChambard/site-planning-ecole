import useEditRdvModal, {
  EditRdvModalFormValues,
} from "@/app/hooks/useEditRdvModal";
import { useCallback, useEffect, useState } from "react";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "../modals/Modal";
import Checkbox from "../inputs/Checkbox";
import TimeInput from "../inputs/TimeInput";
import Heading from "../Heading";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditRdvModal = ({ refresh }: { refresh: () => void }) => {
  const editRdvModal = useEditRdvModal();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const editRdvModalDefaultValues: DefaultValues<EditRdvModalFormValues> = {
      hour: String(editRdvModal.rdv.hour),
      minute: String(editRdvModal.rdv.minute),
      inactive: editRdvModal.rdv.student === "NONE",
    };
    reset(editRdvModalDefaultValues);
  }, [editRdvModal.rdv]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EditRdvModalFormValues>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<EditRdvModalFormValues> = async (data) => {
    setIsLoading(true);
    let newRdv = {
      hour: Number(data.hour),
      minute: Number(data.minute),
      student: "FREE",
    };
    if (data.inactive) newRdv.student = "NONE";
    // do stuff
    axios
      .patch(`/api/rdvs/${editRdvModal.rdv.id}`, newRdv)
      .then((_) => {
        refresh();
        editRdvModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const resetStudent = useCallback(async () => {
    setIsLoading(true);
    axios
      .patch(`/api/rdvs/${editRdvModal.rdv.id}`, { student: "FREE" })
      .then(() => {
        refresh();
        editRdvModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  }, [editRdvModal.rdv]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Modification de rdv"
        subtitle={`Modifier le rendez-vous ${editRdvModal.rdv.id}`}
      />
      <TimeInput register={register} errors={errors} disabled={isLoading} />
      <Checkbox
        id="inactive"
        label="Inactif"
        register={register}
        errors={errors}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editRdvModal.isOpen}
      title="Modifier rdv"
      actionLabel="Modifier"
      onClose={editRdvModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      secondaryActionLabel="Libérer"
      secondaryAction={resetStudent}
    />
  );
};

export default EditRdvModal;
