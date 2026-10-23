
import { GoogleLogin } from '@react-oauth/google';

export default function GoogleButton({
  text = 'signin_with',
  onCredential,
  onError,
}) {
  return (
    <div className="google-button-container">
      <GoogleLogin
        theme="outline"
        size="large"
        shape="rectangular"
        text={text}
        width="320"
        onSuccess={(response) => {
          if (response.credential) {
            onCredential(response.credential);
          } else {
            onError?.('Google did not return a credential.');
          }
        }}
        onError={() => {
          onError?.('Google sign-in failed. Please try again.');
        }}
      />
    </div>
  );
}
