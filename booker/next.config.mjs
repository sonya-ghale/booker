/**  @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: { 
    //   // appDir: true, 
    // },
      images: {
        domains: [
          'res.cloudinary.com', 
          'avatars.githubusercontent.com',
          // google is for future
        //   'lh3.googleusercontent.com'
        ]
      }
};

export default nextConfig;
// module.exports = nextConfig
