import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';

const initialTasks = [
  {
    id: 1,
    title: "Review today's lecture notes",
    details: 'University · 25 min',
    category: 'UNIVERSITY',
    done: true,
  },
  {
    id: 2,
    title: 'Finish the mobile assignment',
    details: 'Development · 40 min',
    category: 'PROJECT',
    done: false,
  },
  {
    id: 3,
    title: 'Practice a coding problem',
    details: 'Personal goal · 20 min',
    category: 'PERSONAL',
    done: false,
  },
  {
    id: 4,
    title: "Plan tomorrow's priorities",
    details: 'Daily routine · 10 min',
    category: 'PERSONAL',
    done: false,
  },
];

const categoryColors = {
  UNIVERSITY: {
    text: '#547A68',
    background: '#EAF2EC',
    label: 'STUDY',
  },
  PROJECT: {
    text: '#9A7042',
    background: '#F6EFE4',
    label: 'PROJECT',
  },
  PERSONAL: {
    text: '#7771A4',
    background: '#EFEDF8',
    label: 'PERSONAL',
  },
};

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const completedCount = tasks.filter(task => task.done).length;

  const progress =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const remainingCount = tasks.length - completedCount;

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const toggleTask = id => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const addTask = () => {
    const title = newTaskTitle.trim();

    if (!title) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      details: 'Personal goal · Added just now',
      category: 'PERSONAL',
      done: false,
    };

    setTasks(currentTasks => [newTask, ...currentTasks]);
    setNewTaskTitle('');
    setModalVisible(false);
  };

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="#F7F7F2" barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>S</Text>
            </View>

            <Text style={styles.brandName}>StudyFlow</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>MA</Text>
          </View>
        </View>

        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.date}>{today.toUpperCase()}</Text>

          <Text style={styles.greeting}>
            {greeting},{'\n'}
            <Text style={styles.greetingName}>Majid.</Text>
          </Text>

          <Text style={styles.subtitle}>
            A little progress every day adds up.
          </Text>
        </View>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View>
              <Text style={styles.cardEyebrow}>YOUR DAILY PROGRESS</Text>

              <Text style={styles.progressTitle}>Keep it going.</Text>
            </View>

            <View style={styles.progressCircle}>
              <Text style={styles.progressPercent}>{progress}%</Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

          <View style={styles.progressBottom}>
            <Text style={styles.progressDescription}>
              {completedCount} of {tasks.length} tasks completed
            </Text>

            <Text style={styles.progressDescription}>
              {remainingCount} remaining
            </Text>
          </View>
        </View>

        {/* Tasks Header */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Your tasks</Text>

            <Text style={styles.sectionSubtitle}>Make today productive.</Text>
          </View>

          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>+ Add task</Text>
          </Pressable>
        </View>

        {/* Tasks List */}
        <View style={styles.tasksList}>
          {tasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Nothing on your list.</Text>

              <Text style={styles.emptySubtitle}>
                Add a task and start making progress.
              </Text>
            </View>
          ) : (
            tasks.map(task => {
              const category = categoryColors[task.category];

              return (
                <Pressable
                  key={task.id}
                  onPress={() => toggleTask(task.id)}
                  style={styles.taskCard}
                >
                  <View
                    style={[styles.checkbox, task.done && styles.checkboxDone]}
                  >
                    {task.done && <Text style={styles.checkmark}>✓</Text>}
                  </View>

                  <View style={styles.taskContent}>
                    <Text
                      style={[
                        styles.taskTitle,
                        task.done && styles.taskTitleDone,
                      ]}
                    >
                      {task.title}
                    </Text>

                    <Text style={styles.taskDetails}>{task.details}</Text>
                  </View>

                  <View
                    style={[
                      styles.categoryTag,
                      { backgroundColor: category.background },
                    ]}
                  >
                    <Text
                      style={[styles.categoryText, { color: category.text }]}
                    >
                      {category.label}
                    </Text>
                  </View>
                </Pressable>
              );
            })
          )}
        </View>

        {/* Focus Tip */}
        <View style={styles.tipCard}>
          <Text style={styles.tipEyebrow}>A LITTLE REMINDER</Text>

          <Text style={styles.tipTitle}>Focus on one thing at a time.</Text>

          <Text style={styles.tipDescription}>
            You don't have to do everything today. Just take the next step.
          </Text>
        </View>

        <Text style={styles.footer}>MADE WITH PURPOSE · STUDYFLOW</Text>
      </ScrollView>

      {/* Add Task Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setModalVisible(false)}
          />

          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />

            <Text style={styles.modalTitle}>New task</Text>

            <Text style={styles.modalSubtitle}>
              What's something you want to get done?
            </Text>

            <TextInput
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              placeholder="Enter your task..."
              placeholderTextColor="#A3A99F"
              style={styles.taskInput}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={addTask}
              maxLength={80}
            />

            <Pressable onPress={addTask} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Add task</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setModalVisible(false);
                setNewTaskTitle('');
              }}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F7F2',
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  logo: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: '#21483B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
  },

  brandName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#243B32',
    letterSpacing: -0.5,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E5EDE5',
    borderWidth: 1,
    borderColor: '#D5E1D5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#315B48',
  },

  greetingSection: {
    marginTop: 32,
    marginBottom: 23,
  },

  date: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.8,
    color: '#899187',
    marginBottom: 10,
  },

  greeting: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    color: '#243B32',
    letterSpacing: -1.2,
  },

  greetingName: {
    color: '#5A806B',
  },

  subtitle: {
    fontSize: 13,
    color: '#899187',
    marginTop: 9,
  },

  progressCard: {
    backgroundColor: '#21483B',
    borderRadius: 23,
    padding: 21,
    marginBottom: 32,
  },

  progressTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 23,
  },

  cardEyebrow: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: '#B2C8B8',
    marginBottom: 8,
  },

  progressTitle: {
    fontSize: 23,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },

  progressCircle: {
    width: 57,
    height: 57,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: '#9DBBA5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressPercent: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  progressTrack: {
    height: 7,
    backgroundColor: '#45695A',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#C5E3A2',
    borderRadius: 10,
  },

  progressBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  progressDescription: {
    fontSize: 10,
    color: '#D0DDD3',
    fontWeight: '600',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#243B32',
    letterSpacing: -0.6,
  },

  sectionSubtitle: {
    fontSize: 12,
    color: '#92988F',
    marginTop: 4,
  },

  addButton: {
    backgroundColor: '#E6EFE4',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  addButtonText: {
    color: '#315B48',
    fontWeight: '800',
    fontSize: 11,
  },

  tasksList: {
    gap: 11,
  },

  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    paddingVertical: 16,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECEEE8',
    minHeight: 77,
  },

  checkbox: {
    width: 23,
    height: 23,
    borderRadius: 8,
    borderWidth: 1.6,
    borderColor: '#CCD5CA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  checkboxDone: {
    backgroundColor: '#47765B',
    borderColor: '#47765B',
  },

  checkmark: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  taskContent: {
    flex: 1,
    paddingRight: 5,
  },

  taskTitle: {
    fontSize: 12,
    color: '#34463B',
    fontWeight: '700',
    marginBottom: 5,
  },

  taskTitleDone: {
    color: '#A1AAA0',
    textDecorationLine: 'line-through',
  },

  taskDetails: {
    fontSize: 10,
    color: '#A0A69D',
  },

  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 7,
  },

  categoryText: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 25,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#34463B',
  },

  emptySubtitle: {
    fontSize: 12,
    color: '#92988F',
    marginTop: 7,
    textAlign: 'center',
  },

  tipCard: {
    backgroundColor: '#EAF0E6',
    padding: 20,
    borderRadius: 19,
    marginTop: 25,
  },

  tipEyebrow: {
    fontSize: 9,
    color: '#65816B',
    fontWeight: '900',
    letterSpacing: 1.4,
    marginBottom: 9,
  },

  tipTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#294536',
    marginBottom: 7,
  },

  tipDescription: {
    fontSize: 12,
    lineHeight: 19,
    color: '#718373',
  },

  footer: {
    textAlign: 'center',
    fontSize: 9,
    letterSpacing: 1.5,
    color: '#A7AEA3',
    fontWeight: '700',
    marginTop: 28,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 36, 28, 0.45)',
  },

  modalCard: {
    backgroundColor: '#F7F7F2',
    paddingHorizontal: 24,
    paddingTop: 13,
    paddingBottom: 30,
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
  },

  modalHandle: {
    width: 42,
    height: 4,
    backgroundColor: '#D5DBD2',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 23,
  },

  modalTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: '#243B32',
  },

  modalSubtitle: {
    fontSize: 12,
    color: '#92988F',
    marginTop: 7,
    marginBottom: 22,
  },

  taskInput: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E3E9E1',
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#243B32',
    marginBottom: 16,
  },

  saveButton: {
    height: 52,
    backgroundColor: '#21483B',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  cancelButton: {
    alignItems: 'center',
    padding: 14,
  },

  cancelButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7E897E',
  },
});
