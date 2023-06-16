import useFillinRollerModal, {
  FillinRollerModalFormValues,
} from "@/app/hooks/useFillinRollerModal";
import { useEffect, useState } from "react";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "../modals/Modal";
import Heading from "../Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import Input from "../inputs/Input";
import Checkbox from "../inputs/Checkbox";

const FillinRollerModal = ({ refresh }: { refresh: () => void }) => {
  const fillinRollerModal = useFillinRollerModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FillinRollerModalFormValues>({
    defaultValues: {},
  });

  useEffect(() => {
    const fillinRollerModalDefaultValues: DefaultValues<FillinRollerModalFormValues> =
      {
        size: fillinRollerModal.roller.size,
        hasRoller: fillinRollerModal.roller.hasRoller,
        hasHelmet: fillinRollerModal.roller.hasHelmet,
        hasProtect: fillinRollerModal.roller.hasProtect,
      };
    reset(fillinRollerModalDefaultValues);
  }, [fillinRollerModal.roller, reset]);

  const onSubmit: SubmitHandler<FillinRollerModalFormValues> = async (data) => {
    setIsLoading(true);
    axios
      .patch(`/api/rollers/${fillinRollerModal.roller.id}`, {
        hasAnswered: true,
        hasRoller: data.hasRoller,
        hasHelmet: data.hasHelmet,
        hasProtect: data.hasProtect,
        size: Number(data.size),
      })
      .then((_) => {
        refresh();
        fillinRollerModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Réponses"
        subtitle="Renseigner la pointure si vous n'avez pas de rollers"
      />
      <Checkbox
        id="hasRoller"
        label="Avez vous des rollers ?"
        register={register}
        errors={errors}
      />
      <Checkbox
        id="hasHelmet"
        label="Avez vous un casque ?"
        register={register}
        errors={errors}
      />
      <Checkbox
        id="hasProtect"
        label="Avez vous des protections ?"
        register={register}
        errors={errors}
      />
      <Input
        label="Pointure"
        id="size"
        register={register}
        errors={errors}
        disabled={isLoading}
        type="number"
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={fillinRollerModal.isOpen}
      title="Sondage"
      actionLabel="Enregistrer"
      onClose={fillinRollerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default FillinRollerModal;
