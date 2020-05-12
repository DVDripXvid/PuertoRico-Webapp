<script>
  export let name;
  export let description;
</script>

<h3>{name.replace(/([A-Z])/g, ' $1').trim()}</h3>
<p>{description}</p>
