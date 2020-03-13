<script>
  import { sessionStore } from "../services/stores";

  window.onGoogleSignIn = googleUser => {
    const profile = googleUser.getBasicProfile();
    const resp = googleUser.getAuthResponse(); 
    const session = {
      token: resp.id_token,
      name: profile.getName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl() + "?sz=512",
      id: profile.getId(),
    }
    sessionStore.set(session);
  };
</script>

<div class="g-signin2" data-onsuccess="onGoogleSignIn" />
