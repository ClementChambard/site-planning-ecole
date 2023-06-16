import useEditRollerModal, {
  EditRollerModalFormValues,
} from "@/app/hooks/useEditRollerModal";
import { useEffect, useState } from "react";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "../modals/Modal";
import Heading from "../Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import Input from "../inputs/Input";

const EditRollerModal = ({ refresh }: { refresh: () => void }) => {
  const editRollerModal = useEditRollerModal();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const editRollerModalDefaultValues: DefaultValues<EditRollerModalFormValues> =
    {
      student: editRollerModal.roller.student,
    };
    reset(editRollerModalDefaultValues);
  }, [editRollerModal.roller]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EditRollerModalFormValues>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<EditRollerModalFormValues> = async (data) => {
    setIsLoading(true);
    axios
      .patch(`/api/rollers/${editRollerModal.roller.id}`, {
        student: data.student,
      })
      .then((_) => {
        refresh();
        editRollerModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Modification de roller"
        subtitle={`Modifier le rendez-vous ${editRollerModal.roller.id}`}
      />
      <Input
        label="Nom"
        id="student"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editRollerModal.isOpen}
      title="Modifier élève"
      actionLabel="Modifier"
      onClose={editRollerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default EditRollerModal;
