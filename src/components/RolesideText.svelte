<script>
export let text;
export let size = 1;
</script>

<div class="text-center font-minion text-text" class:text-xl={size == 1} class:text-2xl={size == 2} class:text-3xl={size == 3}>
{text}
</div>
