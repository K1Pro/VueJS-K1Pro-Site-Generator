<template>
  <div class="product-card">
    <div class="card">
      <img
        src="https://images.pexels.com/photos/225250/pexels-photo-225250.jpeg?auto=compress&cs=tinysrgb&h=700"
        alt="Denim Jeans"
        style="width: 100%"
      />
      <h1>Server config</h1>
      <!-- <p class="price">$19.99</p> -->
      <p>We specialize in server configuration lorem ipsum lorem jeansum. Lorem jeamsun denim lorem jeansum.</p>
      <p>
        <!-- <button>Add to Cart</button> -->
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product Card',
};
</script>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
  background-color: white;
}

.price {
  color: grey;
  font-size: 22px;
}

.card button {
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

.card button:hover {
  opacity: 0.7;
}
</style>
