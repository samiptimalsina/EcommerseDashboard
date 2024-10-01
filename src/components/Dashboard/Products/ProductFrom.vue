<template>
  <div class="product-form">
    <h2>{{ isEditing ? "Edit Product" : "Add New Product" }}</h2>

    <form @submit.prevent="handleSubmit">
      <div class="form-grid">
        <!-- Product Name -->
        <div class="form-group">
          <label for="name">Product Name</label>
          <input
            type="text"
            v-model="form.name"
            id="name"
            @input="generateSlug"
            required
          />
        </div>

        <!-- Product Slug -->
        <div class="form-group">
          <label for="slug">Product Slug</label>
          <input type="text" v-model="form.slug" id="slug" required readonly />
        </div>

        <!-- Product Description with CKEditor -->
        <div class="form-group" style="grid-column: span 2">
          <label for="description">Product Description</label>
          <textarea
            id="description"
            rows="4"
            v-model="form.description"
            placeholder="Write a description..."
            required
          ></textarea>
        </div>

        <!-- Feature Image Upload -->
        <div class="form-group">
          <label for="feature_image">Feature Image</label>
          <input type="file" id="feature_image" @change="handleFeatureImageUpload" />
          <div v-if="form.feature_image_preview" class="image-preview">
            <img :src="form.feature_image_preview" alt="Feature Image Preview" />
          </div>
        </div>

        <!-- Product Image Upload -->
        <div class="form-group">
          <label for="image">Product Image</label>
          <input type="file" id="image" @change="handleImageUpload" />
          <div v-if="form.image_preview" class="image-preview">
            <img :src="form.image_preview" alt="Image Preview" />
          </div>
        </div>

        <!-- Quantity -->
        <div class="form-group">
          <label for="quantity">Quantity</label>
          <input type="number" v-model="form.quantity" id="quantity" required />
        </div>

        <!-- Actual Price -->
        <div class="form-group">
          <label for="actual_price">Actual Price</label>
          <input type="number" v-model="form.actual_price" id="actual_price" required />
        </div>

        <!-- Sale Price -->
        <div class="form-group">
          <label for="sale_price">Sale Price</label>
          <input type="number" v-model="form.sale_price" id="sale_price" required />
        </div>

        <!-- Discount -->
        <div class="form-group">
          <label for="discount">Discount (%)</label>
          <input type="number" v-model="form.discount" id="discount" required />
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary">
        {{ isEditing ? "Update Product" : "Add Product" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/product";

const productStore = useProductStore();
const router = useRouter();

const props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
});

const isEditing = computed(() => Object.keys(props.product).length > 0);

const form = reactive({
  name: "",
  slug: "",
  description: "",
  feature_image: null,
  image: null,
  feature_image_preview: null,
  image_preview: null,
  quantity: 0,
  actual_price: 0,
  sale_price: 0,
  discount: 0,
});

// If editing, populate form with product data
watch(
  () => props.product,
  (newProduct) => {
    if (isEditing.value) {
      Object.assign(form, newProduct);
      form.feature_image_preview = newProduct.feature_image;
      form.image_preview = newProduct.image;
    }
  },
  { immediate: true }
);

const handleFeatureImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.feature_image = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      form.feature_image_preview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.image = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      form.image_preview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("slug", form.slug);
    formData.append("description", form.description);
    formData.append("quantity", form.quantity);
    formData.append("actual_price", form.actual_price);
    formData.append("sale_price", form.sale_price);
    formData.append("discount", form.discount);

    if (form.feature_image) {
      formData.append("featured_image", form.feature_image);
    }
    if (form.image) {
      formData.append("image", form.image);
    }

    await productStore.saveProduct(formData);
    router.push({ name: "Products" });
  } catch (err) {
    console.error("Error saving the product:", err);
  }
};

const generateSlug = () => {
  form.slug = form.name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
</script>

<style scoped>
.product-form {
  max-width: 800px;
  margin: auto;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  height: 150px;
}

.btn {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.image-preview img {
  max-width: 100px;
  height: auto;
  margin-top: 10px;
}
</style>
