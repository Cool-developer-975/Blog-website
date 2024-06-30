import sharp from 'sharp';

export const imageConverter = async (imageFile)=>{
    const buffer = await sharp(imageFile.path)
                        .jpeg({quality: 85, mozjpeg: true})
                        .resize({height: 506, width: 900})
                        .toBuffer();

    return buffer;
}