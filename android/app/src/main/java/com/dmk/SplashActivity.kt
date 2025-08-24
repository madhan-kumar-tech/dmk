package com.dmk

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Set the splash layout with Tamil text
        setContentView(R.layout.splash_screen)
        
        // Launch MainActivity after a short delay and finish splash
        window.decorView.postDelayed({
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish()
        }, 1500) // 1.5 second delay
    }
}
