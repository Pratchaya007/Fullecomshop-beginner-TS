import { useState } from "react";
import { toast } from "sonner";
import Resize from "react-image-file-resizer";
import { deletefile, uploadfile } from "@/api/product";
import { useEcomStore } from "@/stores/ecom-store";
import type { ProductForm } from "./FormProduct";
import { FiLoader } from "react-icons/fi";

interface UploadFileProps {
  form: ProductForm;
  setForm: React.Dispatch<React.SetStateAction<ProductForm>>;
}

const Uploadfile = ({ form, setForm }: UploadFileProps) => {
  const [isloading, setLoading] = useState(false);
  const token = useEcomStore((state) => state.token);

  // console.log(form)

  const handleOcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const files = e.target.files;
    if (files) {
      setLoading(true);
      let allFiles = form.images; //เก็บรูปภาพ
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i]);

        //Validate
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} Not Image !!`);
          continue;
        }
        //Image Resize npm i react-image-file-resizer
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "PNG",
          /**
            "JPEG" // ไฟล์เล็ก
            "PNG" // รองรับ transparent
            "WEBP" // ไฟล์เล็กมาก
           */
          100,
          0,
          (data) => {
            // function
            uploadfile(token!, data)
              .then((res) => {
                // console.log();

                //
                allFiles.push(res.data.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                toast.success("upload image succees ");
                setLoading(false);
                // console.log(res.data.data);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
          },
          "base64",
        );
      }
    }
  };

  const handleDalete = (public_id: string) => {
    // console.log(public_id)
    const img = form.images;
    deletefile(token!, public_id) // axios api with .then and .catch
      .then((res) => {
        // console.log(res)
        const filterImages = img.filter((item) => {
          //filterImage id !== paramiter return new data create in product/imgae
          console.log(item);
          return item.public_id !== public_id;
        });
        // console.log('filterImages' , filterImages)

        //New data is filterImage เพิ่มอันใหม่ลงไป
        setForm({
          ...form,
          images: filterImages,
        });
        toast.error(res.data.message); //ไล่ข้อมูลในการเข้าถึงดีๆๆ
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(form)
  return (
    <div className="mt-5">
      <div className="flex mx-4 gap-4 my-4">
        {
          isloading && <FiLoader className=" w-10 h-10 animate-spin" /> //isLoading ควบคุมการโหลดและ icon Loading with ( && )
        }

        {/* image */}
        {form.images.map((item, index) => (
          <div key={index} className="relative">
            <img src={item.url} className="w-20 h-20 hover:scale-105" />
            <span
              className=" absolute -top-0.5 right-0 bg-rose-600 px-1 py-0 cursor-pointer"
              onClick={() => handleDalete(item.public_id)}
            >
              x
            </span>
          </div>
        ))}
      </div>
      <label className=" items-center gap-2 cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-lg shadow-md transition inline-block">
        📷 Upload Product Images
        <input
          type="file"
          name="images"
          multiple
          onChange={handleOcChange}
          className="hidden"
        />
      </label>
    </div>
  );
};
export default Uploadfile;
