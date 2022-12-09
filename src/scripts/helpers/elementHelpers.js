function showElement(element) {
    return element.classList.remove('hidden');
  }
  
  function hideElement(element) {
    return element.classList.add('hidden');
  }
  
  export { showElement, hideElement };