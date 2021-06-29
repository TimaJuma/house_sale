import React from "react";
import { useForm } from "react-hook-form";
// import { useMutation, gql } from "@apollo/client";
// import { useRouter } from "next/router";
import Link from "next/link";

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
  const [previewImage, setPreviewImage] = React.useState<string>();
  const { register, handleSubmit, setValue, errors, watch } =
    useForm<IFormData>({ defaultValues: {} });
  const address = watch("address");

  React.useEffect(() => {
    register({ name: "address" }, { required: "You should enter your adress" });
    register({ name: "latitude" }, { required: true, min: -90, max: 90 });
    register({ name: "longitude" }, { required: true, min: -180, max: 180 });
  }, []);

  const handleCreate = async (data: IFormData) => {
    console.log(data);
  };

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
      </div>
      {address && (
        <>
          <div className="mt-4">
            <label
              htmlFor="image"
              className="block p-4 border-4 border-dashed border-gray-600 cursor-pointer"
            >
              Click to add an image (16:9)
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={register({
                validate: (fileList: FileList) => {
                  if (fileList.length === 1) return true;
                  return "Please select/upload the file";
                },
              })}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e?.target?.files?.[0]) {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {previewImage && (
              <img
                src={previewImage}
                className="mt-4 objct-cover"
                style={{ width: "576px", height: `${(9 / 16) * 576}px` }}
              />
            )}

            {errors.image && <p>{errors.image.message}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="bedrooms" className="block">
              BEDS
            </label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              className="p-2"
              ref={register({
                required: "Please enter the number of bedrooms",
                max: {
                  value: 10,
                  message:
                    "We dont accept so big houses, its practically a palace",
                },
                min: { value: 1, message: "Must have at least 1 bedroom" },
              })}
            />
          </div>
          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
              type="submit"
              disabled={submitting}
            >
              SAVE
            </button>{" "}
            <Link href="/">
              <a>Cancel</a>
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default HouseForm;
