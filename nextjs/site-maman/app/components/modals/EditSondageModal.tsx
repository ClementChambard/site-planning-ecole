import useEditSondageModal, {
  EditSondageModalFormValues,
} from "@/app/hooks/useEditSondageModal";
import { useEffect, useState } from "react";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import Input from "../inputs/Input";

const EditSondageModal = ({
  updater,
}: {
  updater: (action: string, id: string, data: any) => void;
}) => {
  const editSondageModal = useEditSondageModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EditSondageModalFormValues>({
    defaultValues: {},
  });

  useEffect(() => {
    const editSondageModalDefaultValues: DefaultValues<EditSondageModalFormValues> =
      {
        info: editSondageModal.sondage.info,
        buttonText: editSondageModal.sondage.buttonText,
      };
    reset(editSondageModalDefaultValues);
  }, [editSondageModal.sondage, reset]);

  const onSubmit: SubmitHandler<EditSondageModalFormValues> = async (data) => {
    setIsLoading(true);
    let update = {
      buttonText: data.buttonText,
      info: data.info,
    };
    axios
      .patch(`/api/sondages/${editSondageModal.sondage.id}`, update)
      .then((_) => {
        updater("change", "", update);
        editSondageModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Modification de sondage"
        subtitle={`Modifier le sondage ${editSondageModal.sondage.name}`}
      />
      <Input
        id="buttonText"
        label="Texte du bouton"
        required
        register={register}
        errors={errors}
      />
      <Input
        id="info"
        label="Description"
        required
        register={register}
        errors={errors}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editSondageModal.isOpen}
      title="Modifier sondage"
      actionLabel="Modifier"
      onClose={editSondageModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default EditSondageModal;
