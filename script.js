document.addEventListener('DOMContentLoaded', loadContent);

function loadContent() {

  var form = document.querySelector('form');

  var textInput = form.querySelector('input[type="text"]');

  var placeForTodos = document.getElementById('events');

  var todosArray = [];

  var dragMode = 'insert';

  var swapMode = document.getElementById('swap'),
      insertMode = document.getElementById('insert');
  swapMode.addEventListener('change', checkDragMode);
  insertMode.addEventListener('change', checkDragMode);


  function checkDragMode(){
    if (this.checked) dragMode = this.value;
  }

  form.addEventListener('submit', formSubmit);

  getFromLocalStorage();

  // jQuery
  // $( "#events" ).sortable({
  //   revert: true,
  //   containment: "#events",
  //   stop: function(event, ui) {
  //     updateTodosArray();
  //   }
  // });

  // $( "ul, li" ).disableSelection();


  function formSubmit(e) {
    e.preventDefault();
    var inputContent = textInput.value;
    if (inputContent.length) {
      createToDo(inputContent, todosArray.length);
      addToLocalStorage(inputContent);
      textInput.value = '';
    }
  }

  function createToDo(todoContent, todoIndex) {
    var item = document.createElement('li');
    var itemContent = document.createElement('span');
    itemContent.innerText = todoContent;
    item.appendChild(itemContent);
    var deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', deleteToDo);
    item.appendChild(deleteBtn);
    item.setAttribute('data-index', todoIndex);
    item.setAttribute('draggable', true);
    placeForTodos.appendChild(item);
    addDraggableEvents(item);
  }

  function addToLocalStorage(todoContent) {
    todosArray.push(todoContent);
    window.localStorage.setItem('todosArray', JSON.stringify(todosArray));
  };

  function getFromLocalStorage() {
    todosArray = JSON.parse(window.localStorage.getItem('todosArray'));
    // console.log(todosArray.length);
    if (todosArray !== null) {
      todosArray.forEach(function (item, index) {
        createToDo(item, index);
      })
    }
    else todosArray = [];
  }

  function deleteToDo() {
    this.parentNode.remove();
    updateTodosArray();
  }

  function updateTodosArray() {
    var todosCollection = placeForTodos.querySelectorAll('li');
    todosArray = [];
    todosCollection.forEach(function (item, index) {
      item.setAttribute('data-index', index);
      todosArray.push(item.querySelector('span').innerText);
    });
    window.localStorage.setItem('todosArray', JSON.stringify(todosArray));
  }

  function addDraggableEvents(item) {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('dragend', dragEnd);
    item.addEventListener('drop', dragDrop);
  }

  var startElement;

  function dragStart(e) {
    // console.log('Drag Start');
    this.classList.add('draggable');
    e.dataTransfer.setData('text/html', this.innerHTML);
    console.log(e.dataTransfer);
    startElement = this;
  }

  function dragEnter() {
    // console.log('Drag Enter ', this);
    this.classList.add('under-drag');
  }

  function dragOver(e) {
    // console.log('Drag Over ', this);
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';
  }

  function dragLeave() {
    // console.log('Drag Leave ', this);
    this.classList.remove('under-drag');
  }

  function dragEnd() {
    console.log('Drag End ', this);
    this.classList.remove('draggable');
  }

  function dragDrop(e) {
    this.classList.remove('under-drag');

    console.log('Drag Drop ', this);
    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }
    ;

    if (startElement !== this) {
      console.log(dragMode);
      if (dragMode === 'swap') {
        //variant 1 - insert dragged element
        swapElements(this, startElement);
      }
      else {
        // variant 2 - swap elements
        insertElement(this, startElement);
      };
    }
    updateTodosArray();
  };

  function insertElement(element1, element2){
    element1.parentNode.insertBefore(element2, element1.nextSibling);
  }
  
  function swapElements(element1, element2){
    var swapContainer = element2.innerHTML;
    element2.innerHTML = element1.innerHTML;
    element1.innerHTML = swapContainer;
    //when copying innerHTML, we lost button events, so event listener should be added again
    updateBtnEvents(element1);
    updateBtnEvents(element2);
  }
  
  function updateBtnEvents(element){
    var innerBtn = element.querySelector('button');
    innerBtn.removeEventListener('click', deleteToDo);
    innerBtn.addEventListener('click', deleteToDo);
  }
};


