<template>
    <div class="items-container">
      <h1 class="title">TO DO LIST</h1>

<!--      <button class="fetch-button" @click="getItems">Fetch Items</button>-->

      <ul v-if="items.length > 0" class="item-list">
        <li v-for="item in items" :key="item.id" class="item">
          <span :class="item.completed?'item-completed':'item-name'" v-if="!item.isEditing">{{item.id}}、{{ item.title }}</span>
          <input v-model="item.title" class="item-input" v-if="item.isEditing" />
          <button @click="editItem(item)" class="edit-button">
            <i v-if="!item.isEditing" class="fa-solid fa-pen"/>
            <i v-if="item.isEditing" class="fa-solid fa-floppy-disk"/>
          </button>
          <button @click="completedItem(item)" class="completed-button">
            <i class="fas fa-check" v-if="!item.completed"></i>
            <i class="fa-solid fa-ban" v-if="item.completed"></i>
          </button>
          <button @click="deleteItem(item.id)" class="delete-button">
            <i class="fas fa-trash"></i>
          </button>

        </li>
      </ul>

      <p v-else class="empty-message">No items available</p>

      <div class="add-item-container">
        <input v-model="newItemName" placeholder="Enter item name" class="item-input" />

        <button @click="addItem" class="add-button">
          Add
        </button>
      </div>
    </div>
</template>

<script>
import apiClient from '../../api/api'
export default {
  data() {
    return {
      isEditing:false,
      items: [],
      newItemName: '',
    };
  },
  mounted() {
    this.getItems();
    console.log('get-api success!');
  },
  methods: {
    async getItems() {
      try {
        const response = await apiClient.getItem();
        response.data.forEach((i)=>{
          i.isEditing = false;
        })
        this.items = [...response.data];

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async completedItem(item) {
      try {
        item.completed = !item.completed;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async editItem(item) {
      try {
        item.isEditing = !item.isEditing
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    addItem() {
      const newItem = {
        id: this.getNextItemId(),
        userId: 1,
        title: this.newItemName,
        completed: false
      };

      this.items.push(newItem);
      this.newItemName = ''; // 清空输入框
    },
    getNextItemId() {
      return this.items.length > 0
          ? this.items[this.items.length - 1].id + 1
          : 1;
    },
    deleteItem(itemId) {
      this.items = this.items.filter(item => item.id !== itemId);
    },
  },
};
</script>

<style scoped>
.item-completed{
  color: #e76f51;
  text-decoration: line-through;
}

.items-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #e76f51;
  text-align: center;
}

.fetch-button {
  background-color: #f7a399;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin: 0 auto 20px;
}

.fetch-button:hover {
  background-color: #f36f6f;
}

 .completed-button {
   background-color: #f7a399;
   color: white;
   border: none;
   padding: 6px;
   border-radius: 50%;
   width: 45px;
   height: 45px;
   cursor: pointer;
 }

.completed-button:hover {
  background-color: #f36f6f;
}

.item-list {
  list-style: none;
  padding: 0;
  max-height: 50vh;
  overflow: auto;
}

.item {
  text-align: left;
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 45px 45px 45px;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-name {
  color: #e76f51;
  font-weight: bold;
}

.delete-button {
  background-color: #f94144;
  color: white;
  border: none;
  padding: 6px;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #d43d3d;
}

.edit-button{
  background-color:#cb4f9b;
  color: white;
  border: none;
  padding: 6px;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #ff6ac5;
}

.patch-button {
  background-color:  #53cb4f;
  color: white;
  border: none;
  padding: 6px;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  cursor: pointer;
}

.patch-button:hover {
  background-color: #4ee549;
}

.empty-message {
  font-style: italic;
  color: #e76f51;
  text-align: center;
  margin-top: 20px;
}

.add-item-container {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.item-input {
  flex: 1;
  margin-right: 10px;
  padding: 8px 10px;
  border: 1px solid #e76f51;
  border-radius: 4px;
  color: #e76f51;
  background-color: transparent;
}

.add-button {
  background-color: #e76f51;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #d7635b;
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px !important; /* 设置滚动条宽度 */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: #f1f1f1 !important; /* 设置滚动条轨道背景颜色 */
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: #e76f51 !important; /* 设置滚动条滑块颜色 */
  border-radius: 8px !important; /* 设置滑块的圆角 */
}

/* 鼠标悬停时的滚动条滑块 */
::-webkit-scrollbar-thumb:hover {
  background: #d7635b !important; /* 设置悬停时滚动条滑块颜色 */
}
</style>
