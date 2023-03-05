<script lang="ts">
  import { env } from '$env/dynamic/public';
  import { page } from '$app/stores';
  import { isAuthenticated } from '$lib/stores/me';
  import Icon from '$lib/components/icon.svelte';
  import Gavel from '$lib/components/icons/gavel.svelte';
  import Lock from '$lib/components/icons/lock.svelte';
  import Code from '$lib/components/icons/code.svelte';
  import Bug from '$lib/components/icons/bug.svelte';
  import Exit from '$lib/components/icons/exit.svelte';
  import Trash from '$lib/components/icons/trash.svelte';
  import Fyreplace from '$lib/components/icons/fyreplace.svelte';
  import Enter from '$lib/components/icons/enter.svelte';
  import Avatar from './avatar.svelte';

  const termsOfServiceUrl = new URL('/terms-of-service', env.PUBLIC_WEBSITE_BASE_URL);
  const privacyPolicyUrl = new URL('/privacy-policy', env.PUBLIC_WEBSITE_BASE_URL);
</script>

<div class="container">
  <Avatar />
  <h2>Guest</h2>
  <div class="sections">
    {#if $isAuthenticated}
      <section>
        <h3>Profile</h3>
        <div class="section-content">
          <p>
            <span>Date joined</span>
            <span>Hasn't joined yet</span>
          </p>
          <p role="button">
            <span>Email</span>
            <span class="cut-text">email@example.org</span>
          </p>
          <p role="button">
            <span>Bio</span>
            <span class="cut-text">Empty</span>
          </p>
          <a href={$page.route.id + '/blocked-users'}>
            <span>Blocked users</span>
            <span>0</span>
          </a>
        </div>
      </section>
      <section>
        <h3>About</h3>
        <div class="section-content">
          <a href={termsOfServiceUrl.toString()} target="_blank" rel="noreferrer">
            <span>Terms of service</span>
            <span><Icon><Gavel /></Icon></span>
          </a>
          <a href={privacyPolicyUrl.toString()} target="_blank" rel="noreferrer">
            <span>Privacy policy</span>
            <span><Icon><Lock /></Icon></span>
          </a>
          <a href="https://github.com/fyreplace" target="_blank" rel="noreferrer">
            <span>Source code</span>
            <span><Icon><Code /></Icon></span>
          </a>
          <a href="mailto:bugs@fyreplace.app" target="_blank" rel="noreferrer">
            <span>Report a bug</span>
            <span><Icon><Bug /></Icon></span>
          </a>
        </div>
      </section>
      <section>
        <h3>Danger zone</h3>
        <div class="section-content danger">
          <p role="button">
            <span>Logout</span>
            <span><Icon><Exit /></Icon></span>
          </p>
          <p role="button">
            <span>Delete account</span>
            <span><Icon><Trash /></Icon></span>
          </p>
        </div>
      </section>
    {:else}
      <section>
        <h3>Account</h3>
        <div class="section-content">
          <a href={$page.route.id + '/registration'}>
            <span>Register</span>
            <span><Icon><Fyreplace /></Icon></span>
          </a>
          <a href={$page.route.id + '/login'}>
            <span>Login</span>
            <span><Icon><Enter /></Icon></span>
          </a>
        </div>
      </section>
    {/if}
  </div>
</div>

<style lang="scss">
  @import '../../lib/style/global';

  .container {
    @include flex(column, $align: center);
    padding: var(--gap-medium);
  }

  h3 {
    padding: 0 var(--gap-medium);
  }

  .sections {
    @include flex(column, $gap: var(--gap-medium));
    width: 100%;
    max-width: var(--display-small-max-size);

    .section-content {
      @include flex(column);
      @include no-select;
      box-sizing: border-box;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      overflow: hidden;

      > * {
        @include flex(row, space-between, center, var(--gap-large));
        min-height: 3em;
        margin: 0;
        padding: 0 var(--gap-medium);
        box-sizing: border-box;

        color: unset;
        text-decoration: none;
        transition: 0.3s;

        &[role='button']:hover,
        &[href]:hover {
          background: var(--color-highlight);
          cursor: pointer;
        }

        span {
          display: inline-flex;
          align-items: center;

          &.cut-text {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

        &:not(:last-child) {
          border-bottom: 1px solid var(--color-border);
        }

        & :first-child {
          text-align: start;
        }

        & :last-child {
          --color-text: var(--color-text-secondary);

          color: var(--color-text);
          text-align: end;
        }
      }

      &.danger {
        --color-border: var(--color-no);
        --color-text: var(--color-no);
        --color-text-secondary: var(--color-no);
        --color-highlight: var(--color-no-highlight);

        color: var(--color-text);
      }
    }
  }
</style>
