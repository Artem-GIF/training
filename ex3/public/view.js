const todoTemplate = (id, name) => `
<ul class="todo-item" data-id="${id}">
<div class="card-item">
<div class = "card-item_text">${name}</div>
<div class = "card-actions-area">
    <button class = "action"></button>
</div>
</div>
</ul>
`;
