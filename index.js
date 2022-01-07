import React, {useRef, createRef} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const {width, height} = Dimensions.get('window');

import overlay from './overlay4.png';
import {stories} from './fakeApi';

const CreateStoryComponent = ({x}) => {
  const color = x.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgb(69, 69, 69)', 'rgb(50, 50, 50)'],
    extrapolate: 'clamp',
  });
  return (
    <>
      <Animated.View
        style={[
          styles.createStoryContainer,{
            borderTopRightRadius: x.interpolate({
              inputRange: [0, 100],
              outputRange: [8, 80],
              extrapolate: 'clamp',
            }),
            borderBottomRightRadius: x.interpolate({
              inputRange: [0, 100],
              outputRange: [8, 80],
              extrapolate: 'clamp',
            }),
            backgroundColor:color,
            transform:[
              {
                scaleX:x.interpolate({
                  inputRange:[0,100],
                  outputRange:[1,0.45],
                  extrapolate:'clamp'
                })
              },
              {
                scaleY:x.interpolate({
                  inputRange:[0,100],
                  outputRange:[1,0.25],
                  extrapolate:'clamp'
                })
              },
              {
                translateX: x.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -100],
                  extrapolateRight: 'clamp',
                }),
              },
            ]
          }
        ]}
      />
      <Animated.Image
        source={{uri: 'https://i.pravatar.cc/300?img=12'}}
        resizeMode="cover"
        style={[
          styles.profile_avatar,
          {
            borderTopLeftRadius: x.interpolate({
              inputRange: [0, 100],
              outputRange: [8, 65],
              extrapolate: 'clamp',
            }),
            borderTopRightRadius: x.interpolate({
              inputRange: [0, 100],
              outputRange: [8, 65],
              extrapolate: 'clamp',
            }),
            borderBottomLeftRadius: x.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 65],
              extrapolate: 'clamp',
            }),
            borderBottomRightRadius: x.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 65],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                scaleX: x.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0.25],
                  extrapolate: 'clamp',
                }),
                
              },
              {
                scaleY: x.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0.217],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateX: x.interpolate({
                  inputRange: [0, 30, 60, 100],
                  outputRange: [0, -30, -80, -170],
                  extrapolateRight: 'clamp',
                }),
              },
              {
                translateY: x.interpolate({
                  inputRange: [0, 30, 60, 100],
                  outputRange: [0, 10, 40, 125],
                  extrapolate: 'clamp',
                }),
              },
            ]
          }
        ]}
      />
      <Animated.View
        style={[
          styles.plus,
          {
            borderColor:color,
            transform: [
              {
                scale: x.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0.5],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateX: x.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -65],
                  extrapolateRight: 'clamp',
                }),
              },
              {
                translateY: x.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -45],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }
        ]}>
        <Text style={[styles.plusIcon]}>+</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.createStoryTxtContainer,
          {
            opacity: x.interpolate({inputRange: [0, 30], outputRange: [1, 0]}),
            transform: [
              {
                scale: x.interpolate({
                  inputRange: [0, 30],
                  outputRange: [1, 0.9],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateX: x.interpolate({
                  inputRange: [0, 30],
                  outputRange: [0, -30],
                  extrapolateRight: 'clamp',
                }),
              },
              {
                translateY: x.interpolate({
                  inputRange: [0, 30],
                  outputRange: [0, -25],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }
        ]}>
        <Text style={styles.createStoryTxt}>Criar story</Text>
      </Animated.View>
    </>
  );
};

const Story = ({content, id}) => {
  return (
    <View>
      <Image
        source={{uri: `https://picsum.photos/id/${id * 10}/500/500`}}
        style={styles.imageStory}
        resizeMode="cover"
      />
      <Image source={overlay} style={styles.overlay} resizeMode="cover" />
      <View style={styles.avatarContainer}>
        <Image
          source={{uri: `https://i.pravatar.cc/150?img=${id}`}}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.name}>{content?.name}</Text>
    </View>
  );
};

const FacebookStories = () => {
  const scrollStories = createRef();
  const x = useRef(new Animated.Value(0)).current;

  function onScrollEndDrag(e){
    const {contentOffset} = e.nativeEvent;
    if(contentOffset.x < 50){
      scrollStories.current.scrollToIndex({
        animated:true,
        index:0,
        viewOffset:120,
      })
    }else if(contentOffset.x < 100){
      scrollStories.current.scrollToIndex({
        animated:true,
        index:0,
        viewOffset:0,
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Facebook Stories</Text>
      </View>
      <View style={styles.storiesContainer}>
        <AnimatedFlatList
          data={stories}
          ref={scrollStories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft:112}}
          keyExtractor={(item) => String(item?.id)}
          scrollEventThrottle={16}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {x}}}], {
            useNativeDriver: false,
          })}
          onScrollEndDrag={onScrollEndDrag}
          renderItem={({item, index}) => <Story content={item} id={index} />}
        />
        <CreateStoryComponent x={x}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  titleContainer: {
    backgroundColor: '#323232',
    padding: 12,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  storiesContainer: {
    backgroundColor: '#323232',
    paddingVertical: 12,
    marginTop: 12,
  },
  imageStory: {
    height: 170,
    width: 100,
    backgroundColor: '#ccc',
    marginLeft: 5,
    borderRadius: 8,
  },
  overlay: {
    height: 170,
    width: 100,
    marginLeft: 5,
    borderRadius: 8,
    position: 'absolute',
  },
  avatarContainer: {
    height: 44,
    width: 44,
    borderRadius: 22,
    position: 'absolute',
    backgroundColor: '#3b5998',
    justifyContent: 'center',
    alignItems: 'center',
    left: 12,
    top: 12,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
  name: {
    color: '#FFF',
    position: 'absolute',
    bottom: 12,
    left: 24,
    fontSize: 12,
    fontWeight: 'bold',
    width: 70,
  },
  createStoryContainer: {
    height: 170,
    width: 100,
    borderRadius: 8,
    position: 'absolute',
    top: 12,
    left: 10,
    backgroundColor: '#454545'
  },
  profile_avatar: {
    height: 115,
    width: 100,
    position: 'absolute',
    top: 12,
    left: 10,
    borderTopLeftRadius:8,
    borderTopRightRadius:8,
  },
  plus: {
    backgroundColor: '#3b5998',
    height: 26,
    width: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    position: 'absolute',
    left: 48,
    top: 115,
    borderWidth: 2,
  },
  plusIcon:{
    color:'#fff',
    fontSize:20,
    fontWeight:'bold',
    position:'absolute',
    top:-3,
    left:4,
  },
  createStoryTxtContainer: {
    width: 100,
    left: 10,
    position: 'absolute',
    bottom: 20,
  },
  createStoryTxt: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FacebookStories;
