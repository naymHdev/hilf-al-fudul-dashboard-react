import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxios from "../../Hooks/useAxios";
import { uploadImage } from "../../Api/utils";
import toast from "react-hot-toast";

// Define a custom toolbar
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "color",
  "background",
  "align",
];

const CreateProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [longDes, setLongDes] = useState("");

  const clearEditorContent = () => {
    setValue("");
  };

  const clearLongDesContent = () => {
    setLongDes("");
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const image1 = data.image[0];
      const imageUrl = await uploadImage(image1);

      // from data API payload
      const payload = {
        projectName: data.projectName,
        images: [imageUrl],
        hadiths: {
          firstHadith: data.firstHadith,
          secondHadith: data.secondHadith,
        },
        shortDescription: value,
        projectDescription: longDes,
        projectHighlights: data.projectHighlights.split(","),
        paymentSystem: [
          {
            method: data.bankPayment1,
            details: {
              bankName: data.bankName,
              bankPlace: data.bankPlace,
              accountNumber: data.accountNumber,
              routingName: data.routingName,
              swiftCode: data.swiftCode,
            },
          },
        ],
      };

      // console.log("payload__", payload);

      // Post data to  server
      const res = await useAxios.post("/api/projects", payload);
      console.log("post project___>", res.data);
      setLoading(false);
      setImagePreview(null);
      toast.success("Project submitted successfully!");
    } catch (error) {
      console.error("Error submitting project:", error);
      setLoading(false);
    }
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <h2 className="text-4xl font-extrabold text-green-700">
        Add a New Project
      </h2>
      {/* Project Name */}
      <div className="mb-4 mt-8">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="projectName"
        >
          Project Name
        </label>
        <input
          type="text"
          id="projectName"
          {...register("projectName", { required: true })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter project name"
        />
        {errors.projectName && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* Short Description */}
      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="shortDescription"
        >
          Short Description
        </label>

        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          placeholder="Start typing here..."
        />
      </div>
      <button
        onClick={clearEditorContent}
        className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Clear Content
      </button>

      {/* Long Description */}
      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="projectDescription"
        >
          Long Description
        </label>
        <ReactQuill
          theme="snow"
          value={longDes}
          onChange={setLongDes}
          modules={modules}
          formats={formats}
          placeholder="Start typing here..."
        />
        <button
          onClick={clearLongDesContent}
          className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Clear Content
        </button>
      </div>

      {/* Hadiths */}
      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="firstHadith"
        >
          First Hadith
        </label>
        <input
          type="text"
          id="firstHadith"
          {...register("firstHadith")}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter first hadith"
        />
        {errors.firstHadith && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="secondHadith"
        >
          Second Hadith
        </label>
        <input
          type="text"
          id="secondHadith"
          {...register("secondHadith")}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter second hadith"
        />
        {errors.secondHadith && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      {/* Project Highlights */}
      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="projectHighlights"
        >
          Project Highlights
        </label>
        <input
          type="text"
          id="projectHighlights"
          {...register("projectHighlights")}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter highlights (comma-separated)"
        />
        {errors.projectHighlights && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      {/* Image Upload */}
      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="image"
        >
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          {...register("image", { required: true })}
          onChange={handleImagePreview}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.image && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-4">
          <img src={imagePreview} alt="Preview" className=" w-44 h-auto" />
        </div>
      )}
      {/* Payment System 1 */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">ব্যাংক অ্যাকাউন্ট</h3>
        <div>
          <input
            type="text"
            {...register("bankPayment1")}
            placeholder="অ্যাকাউন্টের নাম"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.bankPayment1 && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div>
          <input
            type="text"
            {...register("bankName")}
            placeholder="ব্যাংক নাম"
            className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <input
            type="text"
            {...register("bankPlace")}
            placeholder="শাখা"
            className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <input
            type="text"
            {...register("accountNumber")}
            placeholder="অ্যাকাউন্ট নম্বর"
            className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <input
            type="text"
            {...register("routingName")}
            placeholder="রাউটিং নাম্বার"
            className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <input
            type="text"
            {...register("swiftCode")}
            placeholder="সুইফট কোড"
            className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center m-10">
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 text-white rounded-md ${
            loading ? "bg-gray-500" : "bg-green-500"
          } focus:outline-none focus:ring-2 focus:ring-green-700`}
        >
          {loading ? "Submitting..." : "Submit Project"}
        </button>
      </div>

      <div className="mt-4 p-4 border rounded-lg shadow-inner bg-gray-50">
        <h3 className="font-semibold text-lg mb-2">Preview:</h3>
        <div className="prose" dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    </form>
  );
};

export default CreateProjectForm;
