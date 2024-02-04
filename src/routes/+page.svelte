<script lang="ts">
	import './reset.css';
	import { onMount } from 'svelte';
	import { QuizIdStorage } from '$lib/dataStorage';
	import { data } from '$lib/data';

	const storage = new QuizIdStorage();
	let ids: readonly string[] = [];
	$: quiz = data.find(d => d.id === ids[0]);

	let displayAnswer = false;

	onMount(() => {
		if (import.meta.env.SSR) return;
		ids = storage.findOrSetIds();
	});
</script>

<header>
	{ids.length} / {data.length}
</header>

<main>
	{#if quiz === undefined}
		<div class="reset">
			<button class="button" on:click={() => storage.reset()}>リセット</button>
		</div>
	{:else}
		<div class="content">
			<div class="quiz">
				<span class="title">問題</span>
				{quiz.quiz}
			</div>
			{#if displayAnswer}
				<div class="answer">
					<span class="title">答え</span>
					{quiz.answer}
				</div>
				<div class="action">
					<div class="content">
						<button class="no" on:click={() => {ids = storage.queueFirst();displayAnswer = false;}}>分からなかった
						</button>
						<button class="ok" on:click={() => {ids = storage.dropFirst(); displayAnswer = false;}}>わかった</button>
					</div>
				</div>
			{/if}
		</div>
		<button class="answer-toggle" class:close={displayAnswer} on:click={() => {displayAnswer = !displayAnswer;}}>
			{#if displayAnswer}
				非表示
			{:else}
				表示
			{/if}
		</button>
	{/if}
</main>
<style lang="scss">
  header {
    display: flex;
    justify-content: center;
    align-items: end;
		padding-bottom: 4px;
    background-color: #c7c7c7;
    width: 100svw;
    height: 80px;
    color: white;
    font-size: 24px;
  }

  main {

    .reset {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100svh - 40px);
      width: 100svw;

      .button {
        padding: 12px 24px;
        background-color: #679cfd;
        color: white;
        font-size: 24px;
        border: none;
        border-radius: 17px;
      }
    }

    & > .content {
      width: 100svw;
      padding: 64px 12px;
      max-width: 512px;

      .quiz {
        padding: 24px;
        font-size: 18px;
        color: #4d4d4d;
        background-color: #f6f6f6;
        border-radius: 8px;
        font-weight: bold;

        & > .title {
          font-size: 16px;
          font-weight: normal;
          color: #4d4d4d;
          display: block;
        }
      }

      .answer {
        margin-top: 24px;
        padding: 24px;
        font-size: 18px;
        color: #4d4d4d;
        background-color: #f6f6f6;
        border-radius: 8px;
        font-weight: bold;

        & > .title {
          font-size: 16px;
          font-weight: normal;
          color: #4d4d4d;
          display: block;
        }
      }

      .action {
        width: 100%;
        margin-top: 128px;
        display: flex;
        justify-content: center;
        align-items: center;

        & > .content {
          display: flex;
          justify-content: space-between;
          width: 340px;

          .no, .ok {
            font-size: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 160px;
            height: 60px;
            border-radius: 12px;
            background-color: #679cfd;
            color: white;
            border: none;
          }

          & > .no {
            background-color: #fdc364;
          }
        }
      }
    }

    .answer-toggle {
      position: fixed;
      bottom: 48px;
      right: 48px;
      height: 64px;
      width: 120px;
      background-color: #679cfd;
      color: white;
      font-size: 24px;
      border: none;
      border-radius: 17px;

      &.close {
        background-color: #fdc364;
      }
    }
  }
</style>