import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadBanner, uploadProfileImage } from "../../redux/features/userSlice";
import { doApiMethod } from '../../api/services/axios-service/axios-service';
import { deleteBannerImage, deleteProfileImage } from "../../api/services/cloudinary-service/cloudinary-service";
import { errorHandler, successHandler } from "../../util/functions";
import { secret } from "../../util/secrets";

export function useUploadWidget({
    userID = "",
    folder,
    single,
    cropping = false,
    showSkipCropButton = false,
    maxImageFileSizeMB = 5
}) {
    const dispatch = useDispatch();
    const { cover_img, profile_img } = useSelector(
        (state) => state.userSlice?.user
    );
    const [loading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);
    const maxImageFileSize = maxImageFileSizeMB * 1024 * 1024; // Convert to bytes

    // documentation here - https://cloudinary.com/documentation/upload_widget_reference
    let myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: secret.CLOUDINARY_NAME, // cloudinary cloud name 
            uploadPreset: secret.CLOUDINARY_PRESET, // cloudinary upload preset
            cropping, // add a cropping step
            showAdvancedOptions: true,  // add advanced options (public_id and tag)
            sources: ["local", "url", "google_drive"], // restrict the upload sources to URL and local files
            showSkipCropButton,
            publicId: `${userID}-${new Date().getTime()}`,
            multiple: !single, // restrict upload to a single file
            folder, // upload files to the specified folder
            maxImageFileSize,  // restrict file size to less than 5MB
            // maxImageWidth: 500, // Scales the image down to a width of 2000 pixels before uploading
            // theme: "purple", // change to a purple theme
            clientAllowedFormats: ["image"],
        },
        async (error, result) => {
            if (!error && result && result.event === "success") {
                setIsLoading(false);
                let image = {
                    url: result.info.url,
                    img_id: result.info.public_id,
                };
                single ? setImages(image) : setImages(prevImages => [...prevImages, image]);

                if (folder === 'banner' && result.info) changeBanner(image);
                if (folder === 'profile' && result.info) changeProfile(image);
            }
        }
    );

    const changeBanner = async (newImageUrl) => {
        try {
            const urlR = "/users/uploadBanner";
            let res = await doApiMethod(urlR, "PATCH", newImageUrl);
            await deleteBannerImage(cover_img?.img_id);
            dispatch(uploadBanner(newImageUrl));
            successHandler(res);
        } catch (err) {
            return errorHandler(err.response.data.msg);
        }

    };

    const changeProfile = async (newImageUrl) => {
        try {
            const urlR = "/users/uploadProfile";
            let res = await doApiMethod(urlR, "PATCH", newImageUrl);
            await deleteProfileImage(profile_img?.img_id);
            dispatch(uploadProfileImage(newImageUrl));
            successHandler(res);
        } catch (err) {
            return errorHandler(err.response.data.msg);
        }
    };

    return [images, myWidget, loading];
}
