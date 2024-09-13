<!-- <template>
  <table>
    <thead>
      <tr>
        <th>Product Name</th>
        <th>Product Slug</th>
        <th>Product Description</th>
        <th>Image</th>
        <th>Qty</th>
        <th>Actual Price</th>
        <th>Sale Price</th>
        <th>Discount</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.slug }}</td>
        <td>{{ product.description }}</td>
        <td><img :src="product.feature_image" alt="Product Image" /></td>
        <td>{{ product.qty }}</td>
        <td>{{ product.actual_price }}</td>
        <td>{{ product.sale_price }}</td>
        <td>{{ product.discount }}</td>
      </tr>
      <tr v-if="!products.length">
        <td colspan="8">No products available.</td>
      </tr>
    </tbody>
    <tfoot></tfoot>
  </table>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  products: {
    type: Array,
    default: () => [],
    required: true,
  },
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

tbody tr:hover {
  background-color: #f9f9f9;
}

img {
  max-width: 100px;
  height: auto;
}
</style> -->
