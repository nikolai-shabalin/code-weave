const obj = {
  name: 'Alice',
  getName: function() {
    console.log(this.name);
  }
};

const getName = obj.getName.bind(obj);
getName();
