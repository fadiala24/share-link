require('dotenv').config();
const connectDB = require('./config/db');
const Profile = require('./models/Profile');
const Platform = require('./models/Platform');

const seed = async () => {
  await connectDB();

  // Clear existing data
  await Profile.deleteMany();
  await Platform.deleteMany();

  // Seed profile
  await Profile.create({
    name: 'AGA TV',
    logoUrl: '/logo1.png',
    subtitle: '',
    backgroundColor: '#00c853',
  });

  // Seed platforms with real links
  await Platform.insertMany([
    {
      name: 'Facebook',
      label: 'AGA TV Facebook',
      url: 'https://www.facebook.com/profile.php?id=100064110279605',
      type: 'facebook',
      iconColor: '#1877F2',
      order: 1,
      active: true,
    },
    {
      name: 'TikTok',
      label: 'AGA TV Tik Tok',
      url: 'https://www.tiktok.com/@agatv27?_r=1&_t=ZP-98MHBcEbJq2',
      type: 'tiktok',
      iconColor: '#000000',
      order: 2,
      active: true,
    },
    {
      name: 'YouTube',
      label: 'AGA TV Youtube',
      url: 'https://youtube.com/@agatv-f9x?si=d9vYF4BJvzAKxd-C',
      type: 'youtube',
      iconColor: '#FF0000',
      order: 3,
      active: true,
    },
  ]);

  console.log('✅ Base de données initialisée avec succès !');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Erreur seed :', err);
  process.exit(1);
});
