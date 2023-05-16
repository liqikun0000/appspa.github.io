---
sidebar_label: "Fastlane"
---
# Fastlane配置
```



default_platform(:android)

platform :android do

     desc "安卓测试包"
     lane :debug do |option|
     # python3 run.py -p common -b devDebug
     # python3 run.py -p common -b release
      puts "打包中..."
     # gradle(task:'clean')
     # gradle(
     #        task: 'assemble',
     #        build_type: 'Debug',
     # )
      wordDir = File.expand_path("..",Dir.pwd)
      puts "wordDir= #{wordDir}"
     # sh("cd #{wordDir} && python3 run.py -p common -b devDebug");
     sh("cd #{wordDir} && ./gradlew  :app:assembleCommonDevdebug");
      data = app_push_android({
         'endpoint':'http:127.0.0.1',
         'apikey':'67a3b53271e1b809c042b6b8ec73e0112',
         'appMatch':'/build/app/outputs/**/*.apk',
         'appId':'644b336a7d2b38001ed53dc2',
         'changeLog':option[:l]||'自动化打包'
        }
      )
      updateAt = Time.new.strftime("%m-%d %H:%M:%S")
      dingTalk_push({
        'ding_access_token':'69c7eaae7894a37580c793fe2c018da06ef7f79814870e869aede9673d3afa01',
        'qrcode_url':"#{data['qrcodeUrl']}",
        'install_url':"#{data['installUrl']}",
        'web_url':'http:127.0.0.1/z9qs31',
        'title':'APP测试包🚀🚀🚀',
        'text':"版本信息：#{data['versionName']}_#{data['versionCode']} \n\n 打包时间：#{updateAt}\n\n 更新说明：#{data['changeLog']}",
      })
      notification(app_icon:"./fastlane/logo.png",title:"LoanManager",subtitle: "APK上传成功", message: "自动打包完成！")
     end

     def app_push_android(params)
       rep = app_push({
          'endpoint':params[:endpoint] ,
          'apikey':params[:apikey],
          'appMatch':'/build/app/outputs/**/*.apk',
          'appId':params[:appId],
          'platform':'android',
          'changeLog':params[:changeLog]||'自动化打包'
        })
#         puts "installUrl=#{rep['data']['installUrl']}"
        return rep['data']
     end
     def app_push(params)
        endpoint = params[:endpoint]
        base_url = "#{endpoint}/api/apps/upload"
        cur_dir = File.expand_path("..",Dir.pwd)
        appMatch = params[:appMatch]
        app_path = Dir["#{cur_dir}#{appMatch}"].last
        puts "app_path: #{app_path}"
        form = [
          ["appId",params[:appId]],
          ["file",File.open(app_path)],
          ["active",params[:active]||"true"],
          ["changeLog",params[:changeLog]||'自动化打包'],
          ["updateMode",params[:updateMode]||'normal'],
          ["platform",params[:platform]||'android']
        ]
        uri = URI.parse(base_url)
        https = Net::HTTP.new(uri.host, uri.port)
        https.use_ssl = false
        request = Net::HTTP::Post.new(uri.request_uri)
        request.add_field('Content-Type', 'multipart/form-data')
        request.add_field('apikey', params[:apikey])
        request.set_form form,'multipart/form-data'
        response = https.request(request)
        puts "------------上传AppSpace------------------"
        puts "App Space Response #{response.code} #{response.message}: #{response.body}"
        return JSON.parse(response.body)
     end
     def dingTalk_push(params)
         ding_access_token = params[:ding_access_token]
         qrcode_url = params[:qrcode_url]
         install_url = params[:install_url]
         web_url = params[:web_url]
         title = params[:title]
         text = params[:text]
         dingTalk_url = "https://oapi.dingtalk.com/robot/send?access_token=#{ding_access_token}"
         puts "install_url = #{install_url}"
         markdown = {
           "msgtype": "actionCard",
           "actionCard": {
               "title": "#{title}",
               "text": "### #{title} \n\n![screenshot](#{qrcode_url}) \n #{text}",
               "btnOrientation": "0",
               "btns": [
                   {
                       "title": "点击安装",
                       "actionURL": install_url
                   },
                   {
                       "title": "查看更多",
                       "actionURL": web_url
                   }
               ]
           }
         }
         uri = URI.parse(dingTalk_url)
         https = Net::HTTP.new(uri.host, uri.port)
         https.use_ssl = true

         request = Net::HTTP::Post.new(uri.request_uri)
         request.add_field('Content-Type', 'application/json')
         request.body = markdown.to_json

         response = https.request(request)
         puts "------------钉钉通知------------------"
         puts "Response #{response.code} #{response.message}: #{response.body}"
     end
end
```


