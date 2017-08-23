package com.katomimobile;

import android.app.Application;
import android.util.Log;

import com.facebook.CallbackManager;
import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.FacebookSdk;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import android.os.Bundle;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager =
          CallbackManager.Factory.create();
  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost =
          new ReactNativeHost(this) {

            @Override
            protected boolean getUseDeveloperSupport() {
              return BuildConfig.DEBUG;
            }

            @Override
            protected List<ReactPackage> getPackages() {
              return Arrays.<ReactPackage>asList(
						new MainReactPackage(),
            new RCTCameraPackage(),
						new RNFetchBlobPackage(),
						new FBSDKPackage(mCallbackManager),
						new VectorIconsPackage()
              );
            }
          };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
}