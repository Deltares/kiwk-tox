import List from 'list.js';

const $component = document.querySelector('[data-downloads]');
const $filter = document.querySelector('[data-downloads-filter]');
const $sort = document.querySelector('[data-downloads-sort]');
const $formatButtons = Array.from(document.querySelectorAll('[data-downloads-format]'));

function initDownloadFilter() {
  if(!$component || !$filter || !$sort || !$formatButtons) {
    return
  }

  const options = {
    listClass: 'js-downloads-list',
    valueNames: [
      { data: ['name'] },
      { data: ['format'] }
    ]
  };

  const list = new List($component, options);
  let sortActive
  let activeFormats = []

  $sort.addEventListener('click', handleSort);
  $filter.addEventListener('submit', event => event.preventDefault());
  $formatButtons.forEach($formatButton => $formatButton.addEventListener('click', () => handleFormat($formatButton) ))

  function handleSort() {
    sortActive = !sortActive;
    $sort.classList.add('downloads-list__filter-button--active')

    const order = sortActive ? 'desc' : 'asc'
    $sort.dataset.downloadsSort = order
    list.sort('name', { order });
  }

  function handleFormat(obj) {
    obj.classList.toggle('downloads-list__filter-button--active')
    const key = obj.dataset.downloadsFormat

    if(activeFormats.includes(key)) {
      activeFormats = activeFormats.filter(item => item !== key)
    } else {
      activeFormats = [...activeFormats, key]
    }

    if(activeFormats.length) {
      list.filter((item) => {
        const { format } = item.values()
        return activeFormats.includes(format)
      });
    } else {
      list.filter()
    }
  }
}

window.initDownloadFilter = window.initDownloadFilter || initDownloadFilter;
