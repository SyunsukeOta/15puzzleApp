const App = new Vue({
  el: '#app',
  data: {
    sample: [
      [
        { id: 1, name: 'aaa'},
        { id: 2, name: 'fff'},
        { id: 3, name: 'oota'}
      ],
      [
        { id: 1, name: 'tanaka'},
        { id: 2, name: 'nakata'},
      ],
      [
        { id: 1, name: 'yamada'}
      ]
    ],
    sum: 0,
  },
  methods: {
    add: function(id) {
      this.sum += id;
      console.log(`now sum is ${this.sum}.`);
      
    }
  }
});