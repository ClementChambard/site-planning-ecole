import useEditPiscineModal, {
  EditPiscineModalFormValues,
} from "@/app/hooks/useEditPiscineModal";
import { useCallback, useEffect, useState } from "react";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "../modals/Modal";
import Heading from "../Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import Input from "../inputs/Input";

const EditPiscineModal = ({ refresh }: { refresh: () => void }) => {
  const editPiscineModal = useEditPiscineModal();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const editPiscineModalDefaultValues: DefaultValues<EditPiscineModalFormValues> =
    {
      date: editPiscineModal.piscine.date,
    };
    reset(editPiscineModalDefaultValues);
  }, [editPiscineModal.piscine]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EditPiscineModalFormValues>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<EditPiscineModalFormValues> = async (data) => {
    setIsLoading(true);
    axios
      .patch(`/api/piscine/${editPiscineModal.piscine.id}`, data)
      .then((_) => {
        refresh();
        editPiscineModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const resetParent = useCallback(async () => {
    setIsLoading(true);
    axios
      .patch(`/api/piscine/${editPiscineModal.piscine.id}`, {
        parent: "FREE",
      })
      .then(() => {
        refresh();
        editPiscineModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  }, [editPiscineModal.piscine]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Modification de séance"
        subtitle={`Modifier la date pour ${editPiscineModal.piscine.id}`}
      />
      <Input
        label="Date"
        id="date"
        type="date"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editPiscineModal.isOpen}
      title="Modifier piscine"
      actionLabel="Modifier"
      onClose={editPiscineModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      secondaryActionLabel="Libérer"
      secondaryAction={resetParent}
    />
  );
};

export default EditPiscineModal;
