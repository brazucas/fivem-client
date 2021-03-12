<script lang="ts">
  export let value: any;

  export let placeholder = 'Pesquisar...';

  type TOption = {
    label: string;
    value: any;
  }

  export let options: Array<TOption>;

  let inputValue = '';

  let selectedValue = null; 

  let visible = false;

  const onInputFocus = (): void => { 
    visible = true;
  }

  const onInputBlur = (): void => {
    visible = false;
    inputValue = selectedValue ? selectedValue : '';
  }

  const select = (option: TOption) => {
    value = option.value;
    inputValue = option.label;
    selectedValue = option.label;
  }

  $: filteredOptions = options.map(option => option.label).includes(inputValue)
    ? options
    : options.filter(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1);

  const matchLetters = (label: string): string => {
    const safeLabel = label.replace('<', '&lt;');
    return safeLabel.replace(new RegExp(inputValue.split(' ').join('|'), 'gi'), match => match ? `<strong>${match}</strong>` : '')
  };
</script>

<style lang="scss">
  .autocomplete-items {
    max-height: 14rem;
  }
  .hover\:bg-brz-gray:hover {
    background-color: #383a3e;
  }
  .bg-brz-gray {
    background-color: #383a3e;
  }
</style>

<div class="relative">
  <input
    bind:value="{inputValue}"
    on:focus="{onInputFocus}"
    on:blur="{onInputBlur}"
    {placeholder}
    type="text"
    class="form-control"
  >
  <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
    <svg class="h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
  </span>
  <div
    class="absolute mt-1 w-full rounded-md bg-gray-100 shadow-lg transition ease-in duration-100"
    class:opacity-100={visible}
    class:opacity-0={!visible}
    class:invisible={!visible}
  >
    <ul class="autocomplete-items max-h-full rounded-md overflow-auto focus:outline-none sm:text-sm">
      {#each filteredOptions as option, i}
      <li
        on:mousedown="{() => select(option)}"
        class="text-gray-900 select-none relative py-2 pl-3 pr-9 transition ease-in duration-100 hover:text-white hover:bg-brz-gray"
        class:bg-brz-gray="{option.label === selectedValue}"
        class:text-white="{option.label === selectedValue}"
      >
        <span class="ml-3 block font-normal truncate">
          {@html matchLetters(option.label)}
        </span>
      </li>
      {/each}
      {#if !filteredOptions.length}
        <li class="text-gray-900 relative py-2 pl-3 pr-9 hover:text-white hover:bg-brz-gray">
          <span class="ml-3 block font-normal truncate">
            Sem resulados
          </span>
        </li>
      {/if}
    </ul>
  </div>
</div>
