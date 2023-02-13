<script>
  import { page } from '$app/stores';
</script>

<div class="error">
  <h1>{$page.status}</h1>
  <p>{$page.error?.message}</p>
</div>

<style lang="scss">
  @import '../lib/style/global';

  .error {
    @include greedy;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
