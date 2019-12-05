<script>
  window.onGoogleSignIn =  (googleUser) => {
    console.log(googleUser.getBasicProfile());
    console.log(googleUser.getAuthResponse());
  }
</script>

<div class="g-signin2" data-onsuccess="onGoogleSignIn" />
