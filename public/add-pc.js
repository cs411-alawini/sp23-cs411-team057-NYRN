function submitAddPcForm(event) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
  
    const pcData = {};
    for (const [key, value] of formData.entries()) {
      if (form[key].type === 'checkbox') {
        pcData[key] = value === 'on' ? 1 : 0;
      } else {
        pcData[key] = value;
      }
    }
  
    fetch('/add-pc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pcData),
    })
      .then((response) => {
        if (response.ok) {
          alert('PC added successfully');
          form.reset();
        } else {
          response.text().then((text) => alert(text));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error adding PC');
      });
  }
  