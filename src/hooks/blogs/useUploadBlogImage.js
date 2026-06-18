import { useMutation } from "@tanstack/react-query";
import { uploadBlogImage } from "../../services/blogService";

export const useUploadBlogImage = () => {
  return useMutation({
    mutationFn: uploadBlogImage,
  });
};