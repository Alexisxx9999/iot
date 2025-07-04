<template>
  <div class="tab-navigation">
    <div class="tab-container">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="selectTab(tab.id)"
        :class="['tab-button', { active: activeTab === tab.id }]"
      >
        <i :class="tab.icon"></i>
        <span>{{ tab.label }}</span>
      </button>
    </div>
    
    <div class="tab-content">
      <slot :name="activeTab"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  defaultTab: {
    type: String,
    default: null
  }
})

const activeTab = ref(props.defaultTab || props.tabs[0]?.id)

const selectTab = (tabId) => {
  activeTab.value = tabId
}
</script>

<style scoped>
.tab-navigation {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}

.tab-container {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.tab-button {
  flex: 1;
  padding: 15px 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.tab-button:hover {
  background-color: #e9ecef;
  color: #495057;
}

.tab-button.active {
  background-color: white;
  color: #007bff;
  border-bottom-color: #007bff;
}

.tab-button i {
  font-size: 16px;
}

.tab-content {
  padding: 25px;
}

@media (max-width: 768px) {
  .tab-container {
    flex-direction: column;
  }
  
  .tab-button {
    padding: 12px 15px;
    font-size: 13px;
  }
}
</style> 