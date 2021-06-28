import React from "react";
import { useForm } from "react-hook-form";
// import { useMutation, gql } from "@apollo/client";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import { Image } from "cloudinary-react";
import SearchBox from "./searchBox";
// import {
//   CreateHouseMutation,
//   CreateHouseMutationVariables,
// } from "src/generated/CreateHouseMutation";
// import {
//   UpdateHouseMutation,
//   UpdateHouseMutationVariables,
// } from "src/generated/UpdateHouseMutation";
// import { CreateSignatureMutation } from "src/generated/CreateSignatureMutation";

interface IFormData {
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: string;
  // input of type file, multiple
  image: FileList;
}

interface IProps {}

const HouseForm = ({}: IProps) => {
  const [submitting, setSubmitting] = React.useState(false);
  const { register, handleSubmit, setValue, errors, watch } =
    useForm<IFormData>({ defaultValues: {} });
  const address = watch("address");

  React.useEffect(() => {
    register({ name: "address" }, { required: "You should enter your adress" });
    register({ name: "latitude" }, { required: true, min: -90, max: 90 });
    register({ name: "longitude" }, { required: true, min: -180, max: 180 });
  }, []);

  const handleCreate = async (data: IFormData) => {};

  const onSubmit = (data: IFormData) => {
    setSubmitting(true);
    handleCreate(data);
  };

  return (
    <form className="mx-auto max-w-xl py-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl">Add A New House</h1>

      <div className="mt-4">
        <label htmlFor="search" className="block">
          Search for the address
        </label>
        <SearchBox
          onSelectAddress={(address, latitude, longitude) => {
            setValue("address", address);
            setValue("latitude", latitude);
            setValue("longitude", longitude);
          }}
          defaultValue=""
        />
        {errors.address && <p>{errors.address.message}</p>}
        <h2>{address}</h2>
      </div>
    </form>
  );
};

export default HouseForm;
