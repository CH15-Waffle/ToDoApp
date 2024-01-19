export const CreateTodoHTML = ({ _id, title, duration, done } = {}) => {
    // Make the <li>
    const li = document.createElement("li");
    li.className = "todo list-group-item";
    if (done) {
      li.classList.add("done", "bg-success");
    }
  
    // Make <span class="todo-title">Title</span>
    const titleSpan = document.createElement("span");
    titleSpan.className = "todo-title";
    titleSpan.textContent = title;
    li.append(titleSpan);
  
    // Make <span class="todo-title">Title</span>
    const durationSpan = document.createElement("span");
    durationSpan.className = "todo-duration";
    durationSpan.textContent = `(${duration})`;
    li.append(durationSpan);

    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'controls'
  
    // Add a 'done' button <button class="done-btn" data-id="b5yfghg">Mark as done<button>
    const doneButton = document.createElement("button");
    doneButton.dataset.id = _id;
    doneButton.className = "done-btn btn btn-secondary";
    doneButton.textContent = `Mark as ${done ? "not" : ""}done`;
    // li.append(doneButton);
    controlsDiv.append(doneButton)

    const updateButton = document.createElement("button");
    updateButton.dataset.id = _id;
    updateButton.className = "update-btn btn btn-warning";
    // updateButton.textContent = `Update`;
    updateButton.innerHTML = `<i class="fa-solid fa-pen"></i>`
    // li.append(doneButton);
    controlsDiv.append(updateButton)

    const deleteButton = document.createElement("button");
    deleteButton.dataset.id = _id;
    deleteButton.className = "delete-btn btn btn-danger";
    // deleteButton.textContent = `Delete`;
    deleteButton.innerHTML = `<i class="fa-sharp fa-solid fa-trash"></i>`
    // li.append(doneButton);
    controlsDiv.append(deleteButton)
    li.append(controlsDiv)
  
    return li;
  };




export const RenderList = (listNode = document.body, data = [], htmlFn = CreateTodoHTML) => {
    // create docFrag
    const fragment = document.createDocumentFragment()
    for (const item of data) {
      // 1. Create an <li>
      const li = htmlFn(item);
      // 2. Append it to the listNode
      fragment.append(li); // frag.append(li)
    }
    listNode.replaceChildren(fragment)
  };