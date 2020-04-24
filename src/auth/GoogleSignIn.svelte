<script context="module">
  function updateSession(user) {
    const profile = user.getBasicProfile();
    const resp = user.getAuthResponse();
    const session = {
      token: resp.id_token,
      name: profile.getName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl() + "?sz=512",
      id: profile.getId(),
      showLobby: true
    };
    sessionStore.set(session);
  }

  export function signIn() {
    if (window.gapi && window.gapi.auth2)
      return window.gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(updateSession);
  }
</script>

<script>
  import { sessionStore } from "../services/stores";

  window.onGoogleSignIn = updateSession;
</script>

<div class="g-signin2" data-onsuccess="onGoogleSignIn" />
