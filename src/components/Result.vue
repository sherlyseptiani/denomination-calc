<template>
<table class="ui table center aligned">
    <thead>
        <tr><th class="six wide">Number</th>
        <th class="ten wide">Notes</th></tr>
    </thead>

    <tbody>
       <slot/>
    </tbody>

    <tfoot class="right aligned">
    <tr>
      <th colspan="2">
         <div class="ui green small button" @click="clear">
            Clear
        </div>
      </th>
    </tr>
    </tfoot>
</table>
</template>

<script>
export default {
  methods: {
      clear(){
          this.$emit('resetForm')
      }
  }
}
</script>

