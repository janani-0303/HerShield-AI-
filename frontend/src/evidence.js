import storage from '@react-native-firebase/storage';
import { launchCamera } from 'react-native-image-picker';

export default async function captureEvidence() {
  const result = await launchCamera({ mediaType: 'video' });
  if (result.assets) {
    const fileUri = result.assets[0].uri;
    const reference = storage().ref(`/evidence/${Date.now()}.mp4`);
    await reference.putFile(fileUri);
    console.log("Evidence uploaded to Firebase Storage");
  }
}
