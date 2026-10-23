// 60問（201〜260）: 2026年10月23日に作成したオリジナル演習問題。
// 追加時は新しい questions-261-xxx.js を作り、index.html で先に読み込む。
window.SAA_QUESTION_BANKS = (window.SAA_QUESTION_BANKS || []).concat(
[
  {
    "id": 201,
    "domain": 1,
    "subtopic": "1.1 cross-account roles",
    "theme": "iam",
    "diff": 2,
    "type": "single",
    "text": "複数のAWSアカウントを使用する企業で、開発アカウントのEC2から監査アカウントのS3バケットを参照する必要があります。アクセスキーをEC2に保存せず、必要なときだけ一時的な権限を取得したい場合、最も適切な設計はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "監査アカウントのrootユーザーのアクセスキーをEC2の環境変数に設定する。"
      },
      {
        "key": "B",
        "text": "EC2のインスタンスプロファイルにロールを設定し、STS AssumeRoleで監査アカウントのロールを引き受ける。"
      },
      {
        "key": "C",
        "text": "監査アカウントのIAMユーザーを作成してアクセスキーをEC2のAMIに埋め込む。"
      },
      {
        "key": "D",
        "text": "両方のアカウントで同じ名前のIAMグループを作成する。"
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "EC2に付与したロールの一時認証情報でSTS AssumeRoleを実行し、監査アカウント側の信頼ポリシーと権限ポリシーで必要なS3参照のみ許可します。長期アクセスキーを配布しない設計です。",
    "wrong_reasons": {
      "A": "rootの長期認証情報を配布することは危険で、最小権限と一時認証情報の要件を満たしません。",
      "C": "AMIへの固定キーの埋め込みは認証情報の流出や更新漏れにつながり、長期キーを不要にする目的に反します。",
      "D": "IAMグループの名前を揃えてもアカウント間の認可は発生せず、AssumeRoleの信頼関係が必要です。"
    }
  },
  {
    "id": 202,
    "domain": 1,
    "subtopic": "1.1 external ID",
    "theme": "iam",
    "diff": 3,
    "type": "single",
    "text": "外部のSaaS事業者に顧客AWSアカウントの監査情報を読み取らせるため、クロスアカウントIAMロールを用意します。同じ事業者が多数の顧客アカウントを扱うため、別顧客のロールを誤って引き受ける混同代理問題を防ぎたいとき、有効な仕組みはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "CloudTrailを無効化して外部事業者の操作を制限する。"
      },
      {
        "key": "B",
        "text": "ロールの最大セッション期間を1時間に短縮する。"
      },
      {
        "key": "C",
        "text": "IAMユーザーのアクセスキーを毎週手動で更新する。"
      },
      {
        "key": "D",
        "text": "ロールの信頼ポリシーで事業者ごとのExternal IDを要求する。"
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "External IDを信頼ポリシーの条件に指定し、SaaS事業者が顧客ごとに割り当てた識別子をSTS AssumeRole時に渡すことで、誤った顧客ロールの引き受けを抑止できます。",
    "wrong_reasons": {
      "A": "CloudTrailは操作記録のサービスで、無効化してもSTSのロール引き受けを制御できません。",
      "B": "セッションを短くしても、別顧客のロールARNを誤って指定する混同代理問題は防げません。",
      "C": "固定キーのローテーションは混同代理を防ぐ条件ではなく、クロスアカウントロールに不要です。"
    }
  },
  {
    "id": 203,
    "domain": 1,
    "subtopic": "1.1 SCP permission boundary",
    "theme": "iam",
    "diff": 2,
    "type": "single",
    "text": "AWS Organizationsで複数のメンバーアカウントを管理しています。開発アカウントではIAM管理者権限を持つユーザーであっても特定リージョンでEC2を起動できないよう、組織全体で上限を設定したいと考えています。どの機能を使うべきですか。",
    "choices": [
      {
        "key": "A",
        "text": "AWS Organizationsのサービスコントロールポリシー（SCP）で該当操作を明示的に拒否する。"
      },
      {
        "key": "B",
        "text": "CloudTrailのイベント履歴で該当リージョンの操作を監視する。"
      },
      {
        "key": "C",
        "text": "開発アカウントの全IAMロールにReadOnlyAccessを追加する。"
      },
      {
        "key": "D",
        "text": "請求アラームにEC2起動のしきい値を設定する。"
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "SCPはメンバーアカウントのプリンシパルが取得できる最大権限の境界を定めます。IAM側でAllowがあってもSCPの明示的Denyが優先され、操作は拒否されます。",
    "wrong_reasons": {
      "B": "CloudTrailは操作記録を提供しますが、起動操作そのものを拒否することはできません。",
      "C": "ReadOnlyAccessの許可を追加しても既存の管理者権限を取り消せません。",
      "D": "請求アラームは費用変化を通知する仕組みで、IAM認可の上限にはなりません。"
    }
  },
  {
    "id": 204,
    "domain": 1,
    "subtopic": "1.2 gateway endpoints",
    "theme": "vpc",
    "diff": 2,
    "type": "multi",
    "count": 2,
    "text": "インターネットに出られないプライベートサブネット内のEC2から、同一リージョンのS3とDynamoDBにアクセスしたいと考えています。NATゲートウェイを追加せず、AWSネットワーク内に通信を保つために有効な構成を2つ選択してください。",
    "choices": [
      {
        "key": "A",
        "text": "DynamoDB向けのGateway型VPCエンドポイントを作成する。"
      },
      {
        "key": "B",
        "text": "両方のサービスにアクセスするためにパブリックALBを新設する。"
      },
      {
        "key": "C",
        "text": "インターネットゲートウェイをプライベートサブネットのルートへ直接指定する。"
      },
      {
        "key": "D",
        "text": "S3向けのGateway型VPCエンドポイントを作成する。"
      },
      {
        "key": "E",
        "text": "EC2のパブリックIPアドレスを付与する。"
      }
    ],
    "correct": [
      "A",
      "D"
    ],
    "explanation": "S3とDynamoDBにはGateway型VPCエンドポイントを使用できます。関連付けたルートテーブルを通じてプライベートサブネットからAWSサービスへ到達でき、NATゲートウェイを必要としません。",
    "wrong_reasons": {
      "B": "ALBはアプリケーションへの負荷分散用で、EC2からS3やDynamoDBへのAPI接続を代行しません。",
      "C": "プライベートインスタンスに必要なインターネット経路を設けることになり、NAT不要の私設接続という目的から外れます。",
      "E": "プライベートサブネットから外部に出る経路の代わりにはならず、プライベート配置の要件に合いません。"
    }
  },
  {
    "id": 205,
    "domain": 1,
    "subtopic": "1.2 source VPCE bucket policy",
    "theme": "storage",
    "diff": 2,
    "type": "single",
    "text": "顧客データを格納するS3バケットへのアクセスを、特定のVPCエンドポイントから来た要求だけに制限することになりました。IAMユーザーに別途S3の許可があっても、指定外の経路からの取得を拒否したい場合、最も適切な設定はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "CloudWatchアラームでS3アクセス数の増加を通知する。"
      },
      {
        "key": "B",
        "text": "S3のバケットポリシーにaws:sourceVpce条件を使った明示的Denyを設定する。"
      },
      {
        "key": "C",
        "text": "EC2のセキュリティグループにS3の送信先IPを1つだけ登録する。"
      },
      {
        "key": "D",
        "text": "S3のライフサイクルルールで30日後にStandard-IAへ移行する。"
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "バケットポリシーで指定したVPCエンドポイントID以外からの要求を明示的に拒否する条件を使えば、ユーザーのAllowだけではアクセスできない制限を実装できます。",
    "wrong_reasons": {
      "A": "CloudWatchでアクセスを監視しても指定外のVPCエンドポイント経由の読み取りを拒否できません。",
      "C": "S3の送信先IPは固定1個ではなく、バケットへの全経路をアクセス制御する仕組みではありません。",
      "D": "ライフサイクルはストレージクラスや削除時期を制御し、接続元を制限しません。"
    }
  },
  {
    "id": 206,
    "domain": 1,
    "subtopic": "1.3 prevent public S3",
    "theme": "security",
    "diff": 2,
    "type": "multi",
    "count": 2,
    "text": "複数の運用担当者が機密情報を含むS3バケットにアクセスします。管理者の操作ミスによってパブリックACLや公開バケットポリシーが設定されても、インターネット公開をできるだけ防ぎたい場合、適切な対策を2つ選択してください。",
    "choices": [
      {
        "key": "A",
        "text": "S3の静的ウェブサイトホスティングを有効にする。"
      },
      {
        "key": "B",
        "text": "全オブジェクトにパブリック読み取りACLを設定する。"
      },
      {
        "key": "C",
        "text": "S3 Object OwnershipをBucket owner enforcedに設定してACLを無効化する。"
      },
      {
        "key": "D",
        "text": "S3 Block Public Accessをアカウント単位で有効にする。"
      },
      {
        "key": "E",
        "text": "S3 Transfer Accelerationを有効にする。"
      }
    ],
    "correct": [
      "C",
      "D"
    ],
    "explanation": "Block Public Accessは公開ACLや公開バケットポリシーによるアクセスをブロックし、Object OwnershipのBucket owner enforcedはACLを無効化できます。両者を組み合わせて設定ミスによる公開面を減らせます。",
    "wrong_reasons": {
      "A": "静的ウェブサイト公開を有効にすることは公開防止につながりません。",
      "B": "公開ACLは機密データの露出を招くため、アクセス制限と逆の操作です。",
      "E": "転送高速化は公開ポリシーやACLによる意図しないアクセスを止める機能ではありません。"
    }
  },
  {
    "id": 207,
    "domain": 1,
    "subtopic": "1.2 secrets rotation",
    "theme": "security",
    "diff": 1,
    "type": "single",
    "text": "データベースのパスワードをLambda関数で利用しています。コードや環境変数に固定値を直接埋め込まず、定期的な自動ローテーションも行いたい場合、最も適切なサービスはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "AWS Systems Manager Parameter StoreのSecureStringに保存し、手作業で定期更新する。"
      },
      {
        "key": "B",
        "text": "Amazon S3の公開オブジェクトとしてパスワードを配置する。"
      },
      {
        "key": "C",
        "text": "AWS Secrets Managerに保存し、対応するローテーション機能を設定する。"
      },
      {
        "key": "D",
        "text": "AWS CloudTrailのイベント履歴にパスワードを保存する。"
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "Secrets Managerはシークレットを暗号化して保管し、対応サービスではローテーションを自動化できます。Lambdaには実行ロールでGetSecretValueなど最小限の参照権限を付与します。",
    "wrong_reasons": {
      "A": "SecureStringで暗号化保管はできますが、パスワードを自動ローテーションする仕組みは別途実装が必要です。",
      "B": "公開オブジェクトに機密情報を保存すると第三者へ漏えいする危険があります。",
      "D": "CloudTrailは操作ログの記録を目的としており、秘密情報の保管・自動更新には使いません。"
    }
  },
  {
    "id": 208,
    "domain": 1,
    "subtopic": "1.1 identity center SSO",
    "theme": "iam",
    "diff": 2,
    "type": "single",
    "text": "社員が企業のIdPで認証し、AWS Organizations配下の複数アカウントに統一された権限セットでサインインできるようにしたいと考えています。AWSアカウントごとにIAMユーザーを増やさないための最適なサービスはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "AWS Certificate Managerで社員のコンソールログインを管理する。"
      },
      {
        "key": "B",
        "text": "AWS IAM Identity Centerで外部IdPと連携し、Permission Setを配布する。"
      },
      {
        "key": "C",
        "text": "Amazon Cognitoユーザープールを全社員のAWSコンソール管理者アカウントとして使う。"
      },
      {
        "key": "D",
        "text": "各AWSアカウントに同じパスワードのIAMユーザーを作成する。"
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "IAM Identity Centerでは組織のIdPとフェデレーションし、Permission Setをアカウントへ割り当てます。社員が複数アカウントへSSOでアクセスでき、個別IAMユーザーを削減できます。",
    "wrong_reasons": {
      "A": "ACMはTLS証明書を管理するサービスで、AWSコンソールの従業員SSOには使用しません。",
      "C": "Cognitoユーザープールは主にアプリケーション利用者の認証向けで、AWSアカウントの権限セット配布には向きません。",
      "D": "アカウントごとの固定IAMユーザーは集中管理にならず、パスワード使い回しの危険もあります。"
    }
  },
  {
    "id": 209,
    "domain": 1,
    "subtopic": "1.2 WAF SQLi",
    "theme": "waf_shield",
    "diff": 2,
    "type": "single",
    "text": "公開ウェブアプリケーションがALB経由でHTTPリクエストを受け付けています。URLやリクエスト本文を悪用したSQLインジェクションを検知・遮断するため、最も適切なAWSの仕組みはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "AWS Shield AdvancedだけをALBに設定する。"
      },
      {
        "key": "B",
        "text": "AWS WAFのWeb ACLをALBに関連付け、SQLインジェクション対策ルールを有効にする。"
      },
      {
        "key": "C",
        "text": "Amazon GuardDutyの検出結果を表示するだけにする。"
      },
      {
        "key": "D",
        "text": "Network ACLの送信ルールですべてのHTTPS通信を拒否する。"
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "AWS WAFはALBに関連付けたWeb ACLでHTTP(S)リクエストの条件を評価できます。SQLインジェクション対策のマネージドルールや独自ルールにより悪意あるリクエストをブロックできます。",
    "wrong_reasons": {
      "A": "Shield AdvancedはDDoS対策サービスであり、SQLインジェクションのHTTPリクエスト内容はWAFで検査します。",
      "C": "GuardDutyは脅威の検出を目的とし、ALBのHTTPリクエストをその場で遮断するWAFルールの代わりにはなりません。",
      "D": "HTTPリクエスト内容を検査できず、正常ユーザーの通信まで遮断してしまいます。"
    }
  },
  {
    "id": 210,
    "domain": 1,
    "subtopic": "1.2 stateless NACL",
    "theme": "vpc",
    "diff": 2,
    "type": "single",
    "text": "VPCのパブリックサブネットにあるWebサーバーの通信をネットワークACLで制限します。インバウンドTCP 443を許可しただけでは、クライアントへの応答が正常に戻りません。最も重要な追加設定はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "Security Groupでアウトバウンドをすべて拒否すれば応答だけ自動許可される。"
      },
      {
        "key": "B",
        "text": "ルートテーブルにVPCピアリングの経路を作成する。"
      },
      {
        "key": "C",
        "text": "同一サブネット内の全サーバーにElastic IPを付ける。"
      },
      {
        "key": "D",
        "text": "アウトバウンド側でクライアントへの一時ポート宛ての通信を許可する。"
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "ネットワークACLはステートレスです。TCP 443への着信を許可しても応答パケットは別方向のルールで評価されるため、アウトバウンドの一時ポート範囲などを許可する必要があります。",
    "wrong_reasons": {
      "A": "Security Groupの状態追跡はNACLのステートレス動作を上書きしません。",
      "B": "インターネット上のクライアントに対するNACL応答ルールの代わりにはなりません。",
      "C": "Elastic IPはアドレス割り当てであり、NACLの戻りトラフィック許可不足を解決しません。"
    }
  },
  {
    "id": 211,
    "domain": 1,
    "subtopic": "1.2 SG referencing",
    "theme": "security",
    "diff": 2,
    "type": "single",
    "text": "EC2のWeb層だけがプライベートサブネットのRDSへ接続できるようにしたいと考えています。Web層のIPはAuto Scalingで頻繁に変わります。運用負担を最小にしてDBの許可元を指定する方法はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "RDSをパブリックアクセス可能に変更してインターネット経由で接続する。"
      },
      {
        "key": "B",
        "text": "Web層の各EC2にElastic IPを付与して許可元IPを固定する。"
      },
      {
        "key": "C",
        "text": "RDSのセキュリティグループで全IPv4アドレスからのDBポートを許可する。"
      },
      {
        "key": "D",
        "text": "RDSのセキュリティグループのインバウンド許可元にWeb層のセキュリティグループIDを指定する。"
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "セキュリティグループIDを参照するルールなら、Web層にそのグループが付いている限りEC2のIP変更に追随します。DBポートをWeb層からのみ許可する構成が簡単に作れます。",
    "wrong_reasons": {
      "A": "データベースを公開する設計は不要な攻撃面を増やし、限定アクセスの要件に反します。",
      "B": "Web層のAuto Scaling環境に固定パブリックIPを持たせる必要はなく、管理負担も増えます。",
      "C": "広すぎる許可範囲となり、Web層だけに限定する要件を満たしません。"
    }
  },
  {
    "id": 212,
    "domain": 1,
    "subtopic": "1.3 KMS authorization",
    "theme": "kms",
    "diff": 3,
    "type": "single",
    "text": "S3オブジェクトを顧客管理KMSキーで暗号化しています。同一アカウント内のIAMロールにs3:GetObjectが許可されていますが、オブジェクト取得時にKMSへのアクセス拒否が発生します。まず確認すべき設定はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "S3バケットのライフサイクルルールで暗号化を無効化する。"
      },
      {
        "key": "B",
        "text": "対象KMSキーのキーポリシーとIAM側のkms:Decrypt権限を確認する。"
      },
      {
        "key": "C",
        "text": "S3 Transfer Accelerationを有効にして通信速度を上げる。"
      },
      {
        "key": "D",
        "text": "IAMロールにEC2の起動権限を追加する。"
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "SSE-KMSで暗号化されたS3オブジェクトの読み取りには、S3へのアクセスに加えてKMSキーの利用が許可される必要があります。キーポリシーとロールのkms:Decryptなどの権限を確認します。",
    "wrong_reasons": {
      "A": "暗号化済みオブジェクトのKMS復号権限不足はライフサイクルで解決できません。",
      "C": "転送高速化の設定は暗号化キーの利用可否には影響しません。",
      "D": "EC2の起動許可ではKMSキーの復号が許可されません。"
    }
  },
  {
    "id": 213,
    "domain": 1,
    "subtopic": "1.3 ACM managed TLS",
    "theme": "security",
    "diff": 1,
    "type": "single",
    "text": "パブリックなApplication Load BalancerにHTTPS通信を終端させたいと考えています。証明書の更新作業を最小限にしながらAWSでTLS証明書を管理したい場合、最も適切なサービスはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "AWS Certificate Managerでパブリック証明書を発行し、ALBのHTTPSリスナーに設定する。"
      },
      {
        "key": "B",
        "text": "AWS KMSの対称暗号キーをALBの証明書欄に指定する。"
      },
      {
        "key": "C",
        "text": "Amazon CloudWatch Logsに秘密鍵と証明書を保存する。"
      },
      {
        "key": "D",
        "text": "Amazon Route 53でAレコードを設定すればTLS証明書を省略できる。"
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "ACMのパブリック証明書はALBに直接関連付けられ、条件を満たすとAWSが更新を管理します。自前で証明書の期限監視や手動差し替えを行う負担を減らせます。",
    "wrong_reasons": {
      "B": "KMS対称暗号キーはTLSサーバー証明書として使用できません。",
      "C": "CloudWatch Logsはログ保管用で、ALBのTLS証明書管理サービスではありません。",
      "D": "DNSレコードは名前解決用で、TLSのサーバー証明書の代替にはなりません。"
    }
  },
  {
    "id": 214,
    "domain": 1,
    "subtopic": "1.2 CloudFront OAC",
    "theme": "cloudfront",
    "diff": 2,
    "type": "single",
    "text": "画像ファイルをS3に保存し、CloudFrontで世界中の利用者に配信します。S3オブジェクトを直接インターネットから取得させず、CloudFront経由のみ許可したい場合の推奨構成はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "S3の静的ウェブサイトエンドポイントのみをオリジンにする。"
      },
      {
        "key": "B",
        "text": "S3 StandardからS3 One Zone-IAへ保存先を変える。"
      },
      {
        "key": "C",
        "text": "CloudFrontのOrigin Access Control（OAC）と制限付きS3バケットポリシーを使用する。"
      },
      {
        "key": "D",
        "text": "S3バケットを公開し、CloudFrontでも同じファイルを公開する。"
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "CloudFront OACをS3オリジンに設定し、バケットポリシーで該当ディストリビューションからの署名付き要求だけを許可します。S3への直接パブリックアクセスを不要にできます。",
    "wrong_reasons": {
      "A": "ウェブサイトエンドポイントにはOACによる署名付きプライベート接続が使用できません。",
      "B": "ストレージクラスの変更ではアクセス元をCloudFrontに限定できません。",
      "D": "S3を公開するとCloudFrontを経由せずオブジェクトを直接取得でき、要件に違反します。"
    }
  },
  {
    "id": 215,
    "domain": 1,
    "subtopic": "1.2 AWS Config compliance",
    "theme": "monitor",
    "diff": 2,
    "type": "single",
    "text": "複数リージョンでEC2とIAMの設定を管理しています。特定の設定ルールに違反したリソースを継続的に一覧化し、設定変更の履歴も確認したいと考えています。適切なAWSサービスはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "AWS CloudTrailでAPI呼び出し履歴を記録する。"
      },
      {
        "key": "B",
        "text": "AWS Security Hubで脅威検出結果のみを集約する。"
      },
      {
        "key": "C",
        "text": "AWS Configを有効にし、Configルールによって準拠状況を評価する。"
      },
      {
        "key": "D",
        "text": "Amazon GuardDutyの検出結果から構成ルール違反を集計する。"
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "AWS Configは対応するAWSリソースの構成情報を記録し、Configルールでポリシー準拠を継続評価できます。設定変更の履歴や非準拠リソースの把握に向いています。",
    "wrong_reasons": {
      "A": "CloudTrailはAPI操作の履歴を記録しますが、構成ルールへの継続的な準拠評価を行うサービスではありません。",
      "B": "Security Hubはセキュリティ状況の集約に役立ちますが、一般的な構成変更履歴の記録にはAWS Configが必要です。",
      "D": "GuardDutyはセキュリティ脅威の検知が中心で、任意のリソース設定ルールの準拠評価には使えません。"
    }
  },
  {
    "id": 216,
    "domain": 1,
    "subtopic": "1.2 GuardDuty",
    "theme": "security",
    "diff": 2,
    "type": "single",
    "text": "会社のAWSアカウントで通常と異なるAPI呼び出しが発生しています。侵害された可能性のあるアクセスキーや不審なネットワーク通信を機械学習などで継続検出し、アラートを出したい場合、適切なサービスはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "AWS Security Hubで各セキュリティサービスの検出結果だけを集約する。"
      },
      {
        "key": "B",
        "text": "Amazon GuardDutyを有効にする。"
      },
      {
        "key": "C",
        "text": "AWS Configでリソース構成の変更を評価する。"
      },
      {
        "key": "D",
        "text": "AWS CloudTrailでAPI呼び出しログを保存する。"
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "GuardDutyはCloudTrail管理イベントなどの情報を分析し、不審なAPI使用や悪意ある通信を検出してFindingを作成します。監査ログの収集だけでなく脅威の検出が目的です。",
    "wrong_reasons": {
      "A": "Security Hubはセキュリティ情報の集約に役立ちますが、異常なAPIパターンの検出エンジンはGuardDutyです。",
      "C": "Configは構成の変更記録とルール準拠を扱いますが、不審な認証情報の利用検知ではGuardDutyが適しています。",
      "D": "CloudTrailはAPI呼び出しの証跡を提供しますが、機械学習などによる脅威判定を主目的としていません。"
    }
  },
  {
    "id": 217,
    "domain": 1,
    "subtopic": "1.3 Macie sensitive data",
    "theme": "security",
    "diff": 2,
    "type": "single",
    "text": "S3バケットが多数存在する企業で、従業員が誤って顧客の個人情報をS3オブジェクトに保存していないか調査したいと考えています。機密データの検出結果を効率よく得るため、最も適切なサービスはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "Amazon MacieでS3オブジェクトの機密データ検出を行う。"
      },
      {
        "key": "B",
        "text": "Amazon GuardDutyでS3バケットへの不審なアクセスを調査する。"
      },
      {
        "key": "C",
        "text": "S3 Inventoryを使ってオブジェクトのメタデータ一覧を生成する。"
      },
      {
        "key": "D",
        "text": "IAM Access AnalyzerでS3バケットの外部アクセスを検出する。"
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "MacieはS3上のデータを検査し、個人情報などの機密データを検出・分類するマネージドサービスです。バケットの検出範囲を指定して調査できます。",
    "wrong_reasons": {
      "B": "GuardDutyは不審なS3 APIアクセスを検知できますが、オブジェクト本文の個人情報分類とは異なります。",
      "C": "S3 Inventoryはオブジェクトの一覧や属性を提供しますが、本文の個人情報を識別する仕組みではありません。",
      "D": "Access Analyzerは公開やクロスアカウント許可などの分析に使えますが、ファイル本文の個人情報は判別しません。"
    }
  },
  {
    "id": 218,
    "domain": 1,
    "subtopic": "1.3 cross-account SSE-KMS",
    "theme": "kms",
    "diff": 3,
    "type": "multi",
    "count": 2,
    "text": "別AWSアカウントのIAMロールに、顧客管理KMSキーでSSE-KMS暗号化したS3オブジェクトの読み取りを許可します。クロスアカウントで実際に復号できるようにするために必要な権限設定を2つ選んでください。",
    "choices": [
      {
        "key": "A",
        "text": "S3バケットポリシー等で別アカウントのロールに対象オブジェクトの読み取りを許可する。"
      },
      {
        "key": "B",
        "text": "KMSキーを削除してS3の暗号化を解除する。"
      },
      {
        "key": "C",
        "text": "S3オブジェクトのストレージクラスをOne Zone-IAへ変更する。"
      },
      {
        "key": "D",
        "text": "KMSキーポリシーで別アカウントからの利用を認め、利用側IAMにもkms:Decryptなどを許可する。"
      },
      {
        "key": "E",
        "text": "別アカウントへS3 Access Logsの書き込み権限だけを付与する。"
      }
    ],
    "correct": [
      "A",
      "D"
    ],
    "explanation": "クロスアカウントのSSE-KMSオブジェクト読み取りには、S3オブジェクトの参照権限と、KMSキーの復号利用権限の両方が必要です。KMSではキーポリシーと利用側IAMポリシーが連携します。",
    "wrong_reasons": {
      "B": "キーを削除すると暗号化データの復号ができなくなり、データ損失につながるおそれがあります。",
      "C": "ストレージクラスの変更ではS3およびKMSのアクセス許可を与えられません。",
      "E": "アクセスログの書き込み許可だけではオブジェクト本文の読み取りや復号は許可されません。"
    }
  },
  {
    "id": 219,
    "domain": 2,
    "subtopic": "2.1 fanout SQS",
    "theme": "decoupling",
    "diff": 2,
    "type": "single",
    "text": "注文受付サービスが注文イベントを通知し、請求サービスと配送サービスが独立してすべての注文を処理する必要があります。一方の処理が停止しても、もう一方に影響させずメッセージを保持したい場合、最適なアーキテクチャはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "注文サービスから単一のSQSキューに送信し、請求と配送が同じキューを競合して読み取る。"
      },
      {
        "key": "B",
        "text": "請求と配送のLambdaをそれぞれSNSトピックに直接登録し、永続キューを設けない。"
      },
      {
        "key": "C",
        "text": "注文サービスからSNSトピックへ発行し、請求用と配送用の別々のSQSキューをサブスクライブさせる。"
      },
      {
        "key": "D",
        "text": "注文サービスから請求サービスだけに同期HTTPリクエストを送る。"
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "SNSトピックに発行したイベントを各購読先SQSキューへ複製すれば、各サービスは自分のキューから独立して処理できます。遅延や障害が起きても他のサービスを止めません。",
    "wrong_reasons": {
      "A": "同じSQSキューを複数コンシューマーが読むと各メッセージは通常どちらか一方に渡り、両方が全件を処理できません。",
      "B": "SNSからの直接起動は可能ですが、各処理が停止してもイベントを独立に長期間保持したい要件にはSQSが適しています。",
      "D": "配送側にイベントが届かず、請求サービスの停止が注文受付にも影響し得ます。"
    }
  },
  {
    "id": 220,
    "domain": 2,
    "subtopic": "2.1 FIFO group ordering",
    "theme": "sns_sqs",
    "diff": 2,
    "type": "single",
    "text": "決済イベントをSQS FIFOキューで処理します。同じ注文に関する操作は発行順で処理し、異なる注文は並列に処理できるようにしたいと考えています。どのMessageGroupIdの設計が最も適切ですか。",
    "choices": [
      {
        "key": "A",
        "text": "全メッセージに同じ固定のMessageGroupIdを使う。"
      },
      {
        "key": "B",
        "text": "イベントごとにランダムなMessageGroupIdを使う。"
      },
      {
        "key": "C",
        "text": "ユーザーのWebブラウザのUser-AgentをMessageGroupIdにする。"
      },
      {
        "key": "D",
        "text": "注文IDをMessageGroupIdに設定する。"
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "FIFOキューでは同一MessageGroupId内のメッセージを順序付きで処理します。注文IDをグループIDにすれば注文ごとの順序を維持しながら、異なる注文の並列実行が可能です。",
    "wrong_reasons": {
      "A": "グループが1つだと異なる注文も同じ順序制約に入り、並列処理の余地が小さくなります。",
      "B": "同じ注文の連続イベントが別グループに分散し、注文単位の順序を維持できません。",
      "C": "同一注文でも異なる端末から操作され得るため、注文単位の順序保証に適しません。"
    }
  },
  {
    "id": 221,
    "domain": 2,
    "subtopic": "2.1 Lambda partial batch",
    "theme": "serverless",
    "diff": 3,
    "type": "single",
    "text": "LambdaがSQSから10件をバッチ取得して処理しています。バッチ中の9件は成功し、1件だけ失敗しました。正常処理済みの9件を再処理せず、失敗した1件のみ再試行させるための有効な方法はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "LambdaイベントソースマッピングでReportBatchItemFailuresを有効化し、失敗したメッセージIDを返す。"
      },
      {
        "key": "B",
        "text": "SQSのメッセージ保持期間を最短に変更する。"
      },
      {
        "key": "C",
        "text": "SQSキューの可視性タイムアウトを0秒に変更する。"
      },
      {
        "key": "D",
        "text": "Lambdaの予約済み同時実行数を常に1に固定する。"
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "Lambdaの部分的バッチ応答を使用すると、失敗したメッセージの識別子だけを報告できます。正常完了したメッセージを再配信対象から外し、不要な重複処理を減らせます。",
    "wrong_reasons": {
      "B": "失敗時に必要な再試行機会が減り、正常メッセージだけを除外する機能にはなりません。",
      "C": "処理中のメッセージが直ちに再配信され、重複処理や競合が増えます。",
      "D": "同時実行数を制限してもバッチ内で成功したメッセージの再配信範囲は変わりません。"
    }
  },
  {
    "id": 222,
    "domain": 2,
    "subtopic": "2.1 SQS visibility timeout",
    "theme": "sns_sqs",
    "diff": 2,
    "type": "single",
    "text": "SQSキューをLambdaがイベントソースとして処理します。処理に最大40秒かかる一方、SQSの可視性タイムアウトは10秒です。処理中の同じメッセージが再配信されて重複処理が起きています。まず変更すべき設定はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "Lambdaのメモリ割当をゼロにする。"
      },
      {
        "key": "B",
        "text": "SQSのメッセージ保持期間を10秒に短縮する。"
      },
      {
        "key": "C",
        "text": "SQSの可視性タイムアウトをLambdaの処理時間に対して十分長く設定する。"
      },
      {
        "key": "D",
        "text": "SQSのキューをFIFOにすれば可視性タイムアウトが不要になる。"
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "可視性タイムアウト中は受信済みメッセージが他のコンシューマーから隠れます。Lambda処理の完了前に時間切れになると再配信され得るため、処理時間とバッチウィンドウを考慮して十分な値に設定します。",
    "wrong_reasons": {
      "A": "Lambdaには最低限のメモリ割当が必要で、重複配信を防ぐ設定ではありません。",
      "B": "保持期間を短くすると未処理メッセージが消えやすくなり、処理中の再配信原因を解決できません。",
      "D": "FIFOでも可視性タイムアウトは必要であり、処理中のメッセージが可視化される問題は残ります。"
    }
  },
  {
    "id": 223,
    "domain": 2,
    "subtopic": "2.2 Route53 failover",
    "theme": "ha",
    "diff": 2,
    "type": "single",
    "text": "EC2で動くWebサイトを東京リージョンと大阪リージョンに用意しています。通常は東京へ接続し、東京側が利用できない場合に大阪へ自動的にDNS応答を切り替えたいと考えています。最も適切なRoute 53設定はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "Route 53の加重ルーティングで常に東京へ100%、大阪へ0%を固定する。"
      },
      {
        "key": "B",
        "text": "各リージョンのプライベートホストゾーンだけに同じレコードを作成する。"
      },
      {
        "key": "C",
        "text": "Route 53のジオロケーションルーティングで国別に接続先を固定する。"
      },
      {
        "key": "D",
        "text": "Route 53フェイルオーバールーティングとヘルスチェックを構成する。"
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "Route 53のフェイルオーバールーティングはプライマリとセカンダリを定義し、ヘルスチェック結果に基づいて返答先を切り替えられます。DNSキャッシュ時間も切り替え速度に影響します。",
    "wrong_reasons": {
      "A": "固定の重みだけでは東京の障害を条件とした自動切り替えになりません。",
      "B": "プライベートホストゾーンはVPC内部の名前解決用で、公開サイトへのフェイルオーバーには適しません。",
      "C": "地理的条件による振り分けでは東京の障害に連動した自動フェイルオーバーを実現できません。"
    }
  },
  {
    "id": 224,
    "domain": 2,
    "subtopic": "2.2 ELB health in ASG",
    "theme": "elb_asg",
    "diff": 3,
    "type": "multi",
    "count": 2,
    "text": "ALB配下のEC2をAuto Scalingグループで管理しています。EC2インスタンスのステータスチェックは正常でも、デプロイ後にアプリがHTTP 500を返す個体があります。アプリ異常を検知してAuto Scalingが当該インスタンスを自動交換するために必要な対策を2つ選んでください。",
    "choices": [
      {
        "key": "A",
        "text": "Auto ScalingグループのDesired Capacityを0に固定する。"
      },
      {
        "key": "B",
        "text": "Auto ScalingグループのヘルスチェックにELBの結果を使用する設定を行う。"
      },
      {
        "key": "C",
        "text": "ALBターゲットグループにアプリケーションの正常性を判定できるヘルスチェックパスを設定する。"
      },
      {
        "key": "D",
        "text": "EC2に割り当てるEBSボリュームのサイズを毎日増やす。"
      },
      {
        "key": "E",
        "text": "EC2のインスタンスステータスチェックだけを有効にし、ALBの結果を無視する。"
      }
    ],
    "correct": [
      "B",
      "C"
    ],
    "explanation": "ALBターゲットグループのHTTPヘルスチェックでアプリ障害を検出し、Auto ScalingグループがELBのヘルスチェック結果を評価するよう設定すると、正常なEC2でもアプリが異常な場合に置き換えられます。",
    "wrong_reasons": {
      "A": "インスタンスをゼロにするとアプリケーションを提供できず、自動交換という要件を満たしません。",
      "D": "EBS容量を増やしてもアプリケーションのヘルスチェックによる自動置換の仕組みにはなりません。",
      "E": "EC2自体の稼働は正常でもアプリが500を返す場合を交換対象にできません。"
    }
  },
  {
    "id": 225,
    "domain": 2,
    "subtopic": "2.2 RDS Proxy pooling",
    "theme": "rds_aurora",
    "diff": 2,
    "type": "single",
    "text": "Lambda関数のアクセスが短時間に数千同時実行まで増えると、RDSへのDB接続数が上限に達して失敗します。アプリケーションのSQL処理は維持したまま接続数を効率よく管理するには、どのサービスが適切ですか。",
    "choices": [
      {
        "key": "A",
        "text": "RDSの自動バックアップ保持期間を延ばす。"
      },
      {
        "key": "B",
        "text": "RDSリードレプリカを作成し、すべての書き込みをそこへ転送する。"
      },
      {
        "key": "C",
        "text": "Lambdaのタイムアウトを15分に延ばす。"
      },
      {
        "key": "D",
        "text": "Amazon RDS ProxyをLambdaとRDSの間に導入する。"
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "RDS ProxyはDB接続をプールして再利用し、Lambdaなどからの接続急増を吸収します。データベースが処理する接続数を抑えて安定性を高められます。",
    "wrong_reasons": {
      "A": "バックアップ保持期間は障害復旧用で、接続のプーリングには影響しません。",
      "B": "リードレプリカは基本的に参照用であり、プライマリの書き込み接続数問題に直接対応しません。",
      "C": "実行時間の上限を増やしてもDBへの同時接続集中は解消されません。"
    }
  },
  {
    "id": 226,
    "domain": 2,
    "subtopic": "2.2 Aurora global DB",
    "theme": "backup_dr",
    "diff": 3,
    "type": "single",
    "text": "本番アプリは東京リージョンにあります。東京が停止した場合に短いRPOで大阪リージョンへデータベースを復旧したいと考えています。データベースはAmazon Auroraであり、リージョン間の継続レプリケーションを求めています。最も適切な機能はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "CloudFrontのキャッシュにAuroraのデータファイルを保存する。"
      },
      {
        "key": "B",
        "text": "毎週のRDSスナップショットを手動で別リージョンへコピーする。"
      },
      {
        "key": "C",
        "text": "Auroraのライターノードを同一AZに2台手動配置する。"
      },
      {
        "key": "D",
        "text": "Aurora Global Databaseを使用してセカンダリリージョンへ複製する。"
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "Aurora Global Databaseはストレージベースのリージョン間レプリケーションを提供し、低いレプリケーション遅延を実現します。障害時の昇格・切り替え手順とアプリ接続先の制御も別途設計します。",
    "wrong_reasons": {
      "A": "CloudFrontはコンテンツ配信用で、Auroraの継続的なレプリケーションには使いません。",
      "B": "週1回のスナップショットだけでは短いRPOを満たせません。",
      "C": "同一AZへの配置ではリージョン障害に対応できず、Auroraの書き込み構成とも合いません。"
    }
  },
  {
    "id": 227,
    "domain": 2,
    "subtopic": "2.2 DynamoDB global tables",
    "theme": "database",
    "diff": 2,
    "type": "single",
    "text": "世界各地の利用者が同じ商品在庫のDynamoDBデータを地域ごとに読み書きします。複数リージョンで書き込み可能とし、データを自動的に複製したい場合、最も適切なサービス機能はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "DynamoDBのグローバルテーブルを利用する。"
      },
      {
        "key": "B",
        "text": "DynamoDBから毎晩CSVをエクスポートする。"
      },
      {
        "key": "C",
        "text": "単一リージョンのDynamoDBテーブルにDAXを配置する。"
      },
      {
        "key": "D",
        "text": "CloudWatch LogsでDynamoDB操作ログを複製する。"
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "DynamoDBグローバルテーブルは複数リージョンにレプリカを置き、各リージョンで読み書き可能な構成を作れます。最終的整合性や同時更新時の競合処理を考慮する必要があります。",
    "wrong_reasons": {
      "B": "夜間バッチでは複数リージョンでの継続的な双方向書き込みと同期を実現できません。",
      "C": "DAXは読み取りを高速化するキャッシュで、複数リージョンの書き込みや自動複製を提供しません。",
      "D": "CloudWatch Logsはログ収集用で、DynamoDBのテーブルデータを双方向同期する機能ではありません。"
    }
  },
  {
    "id": 228,
    "domain": 2,
    "subtopic": "2.1 Step Functions retries",
    "theme": "eventbridge",
    "diff": 2,
    "type": "single",
    "text": "注文処理で支払い確認、在庫引当、配送依頼を順番に実行します。各処理には失敗時の再試行と、再試行しても失敗した場合の分岐が必要です。Lambda同士の独自連携をできるだけ減らすため、最適なサービスはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "Amazon SNSから3つのLambdaへ同時に通知する。"
      },
      {
        "key": "B",
        "text": "Amazon SQSの単一キューに3つの処理タスクを同時投入する。"
      },
      {
        "key": "C",
        "text": "Amazon EventBridgeの独立した複数ルールから各Lambdaを直接起動する。"
      },
      {
        "key": "D",
        "text": "AWS Step Functionsでステートマシンを作り、RetryとCatchを定義する。"
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "Step Functionsはタスク実行、分岐、例外処理、再試行を宣言的に定義できます。複数Lambdaを組み合わせた業務処理を見える形で制御しやすくなります。",
    "wrong_reasons": {
      "A": "SNSのファンアウトは並列通知には向きますが、3つの処理の順次実行と失敗時の条件分岐を管理しません。",
      "B": "単一キューでは処理間の依存関係や条件分岐を明示的に管理できず、Step Functionsの用途に適します。",
      "C": "独立したイベント配信ではステップ間の実行順序と成功・失敗に応じた遷移を一元管理しにくくなります。"
    }
  },
  {
    "id": 229,
    "domain": 2,
    "subtopic": "2.2 backup isolation",
    "theme": "backup_dr",
    "diff": 2,
    "type": "single",
    "text": "災害や不正操作に備え、複数アカウントのEC2/EBSとRDSのバックアップを管理します。本番アカウントが侵害された際にも復旧用コピーを守れるよう、別アカウントへコピーを保存したい場合の適切なサービスはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "AWS Backupでバックアッププランとクロスアカウントコピーを構成する。"
      },
      {
        "key": "B",
        "text": "すべてのバックアップを本番アカウントのS3バケットにまとめる。"
      },
      {
        "key": "C",
        "text": "各EC2のユーザーデータにバックアップ開始コマンドを毎日起動する。"
      },
      {
        "key": "D",
        "text": "同じ本番アカウント内にRDSリードレプリカを作成する。"
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "AWS Backupは対応するAWSリソースのバックアップをプランで管理し、サポートするリソースについて別アカウントや別リージョンへのコピーを構成できます。分離した復旧先は侵害時の防御層になります。",
    "wrong_reasons": {
      "B": "同じ本番アカウントだけに保管すると、アカウント侵害時の削除や改ざんから分離できません。",
      "C": "インスタンス個別のスクリプトでは複数サービスの一元管理や別アカウントへの保護を満たしにくくなります。",
      "D": "同一アカウント内のリードレプリカは本番アカウントが侵害された場合の独立した復旧コピーとして不十分です。"
    }
  },
  {
    "id": 230,
    "domain": 2,
    "subtopic": "2.2 S3 CRR prerequisites",
    "theme": "storage",
    "diff": 3,
    "type": "multi",
    "count": 2,
    "text": "S3バケットを東京から大阪へクロスリージョンレプリケーション（CRR）で複製します。既存バケット同士を利用し、今後アップロードされるオブジェクトを対象とします。基本的な前提条件を2つ選んでください。",
    "choices": [
      {
        "key": "A",
        "text": "送信元と送信先は必ず同一リージョンにする。"
      },
      {
        "key": "B",
        "text": "送信先バケットでもバージョニングを有効にする。"
      },
      {
        "key": "C",
        "text": "送信先バケットのパブリック読み取りを許可する。"
      },
      {
        "key": "D",
        "text": "送信元バケットでバージョニングを有効にする。"
      },
      {
        "key": "E",
        "text": "すべてのオブジェクトを手作業でダウンロードして再アップロードする。"
      }
    ],
    "correct": [
      "B",
      "D"
    ],
    "explanation": "S3レプリケーションでは送信元・送信先の双方でバージョニングが必要です。適切なIAMロールとレプリケーションルールも設定し、新規オブジェクトを複製します。",
    "wrong_reasons": {
      "A": "クロスリージョンレプリケーションでは異なるリージョンを使用します。",
      "C": "レプリケーションのためにバケットを公開する必要はありません。",
      "E": "CRRの自動複製に手作業のコピーは不要です。"
    }
  },
  {
    "id": 231,
    "domain": 2,
    "subtopic": "2.2 ECS Fargate multi AZ",
    "theme": "ha",
    "diff": 2,
    "type": "multi",
    "count": 2,
    "text": "ECS FargateでHTTP APIを実行します。単一タスクや単一AZの障害でもAPIを利用可能にし、タスクのヘルスチェックで不健康なものへの振り分けを止めたいと考えています。適切な設計を2つ選んでください。",
    "choices": [
      {
        "key": "A",
        "text": "単一AZの単一タスクのみで実行し、CPUメモリを最大にする。"
      },
      {
        "key": "B",
        "text": "Application Load Balancerのターゲットグループとヘルスチェックを使用する。"
      },
      {
        "key": "C",
        "text": "ECSのタスクイメージを毎日S3へ手動コピーする。"
      },
      {
        "key": "D",
        "text": "すべてのAPI応答をSNSで利用者にメール配信する。"
      },
      {
        "key": "E",
        "text": "ECSサービスを複数AZのサブネットに展開し、複数タスクを維持する。"
      }
    ],
    "correct": [
      "B",
      "E"
    ],
    "explanation": "複数AZで複数タスクをECSサービスとして維持し、ALBでヘルスチェックに合格したターゲットへ振り分ける構成なら、タスク・AZ障害時の継続性を高められます。",
    "wrong_reasons": {
      "A": "単一タスク・単一AZ構成は両方の障害に対する単一障害点が残ります。",
      "C": "イメージのコピーはタスク障害の自動復旧・ルーティング制御にはなりません。",
      "D": "SNS通知はHTTP APIの正常タスクへの負荷分散機能ではありません。"
    }
  },
  {
    "id": 232,
    "domain": 2,
    "subtopic": "2.2 ElastiCache Multi AZ",
    "theme": "database",
    "diff": 2,
    "type": "single",
    "text": "Amazon ElastiCacheのRedis OSSレプリケーショングループで、読み取り負荷分散のためリードレプリカを使用しています。プライマリノードが故障した場合にもキャッシュの提供を継続し、管理者による手動切り替えを減らしたい場合、最も適切な構成はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "レプリカを複数AZに配置し、Multi-AZ自動フェイルオーバーを有効化する。"
      },
      {
        "key": "B",
        "text": "レプリカを削除してプライマリ1台だけに集約する。"
      },
      {
        "key": "C",
        "text": "プライマリのノードメモリだけを増やす。"
      },
      {
        "key": "D",
        "text": "スナップショットを毎月取得するだけにする。"
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "Redis OSSのレプリケーショングループでMulti-AZ自動フェイルオーバーを使用すると、プライマリ障害時に適切なレプリカへ自動的に切り替えられます。キャッシュ層の単一障害点を減らせます。",
    "wrong_reasons": {
      "B": "単一プライマリにすると障害時の切り替え先がなくなり、可用性が下がります。",
      "C": "メモリ増強は容量対策になりますが、ノード障害時の自動昇格には対応しません。",
      "D": "バックアップは後からデータを復元するための機能で、ノード障害時の自動切り替えにはなりません。"
    }
  },
  {
    "id": 233,
    "domain": 2,
    "subtopic": "2.1 EventBridge content routing",
    "theme": "eventbridge",
    "diff": 2,
    "type": "single",
    "text": "アプリケーションが「注文受付」「配送開始」「返品登録」などのイベントを送ります。受信側サービスごとにイベント本文の種類や属性に応じて異なる処理先へ振り分けたい場合、サーバー管理を最小化できる構成はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "単一のSQSキューに全イベントを送信し、コンシューマーで手動分類する。"
      },
      {
        "key": "B",
        "text": "Amazon EventBridgeのイベントバスとイベントパターンのルールを使用する。"
      },
      {
        "key": "C",
        "text": "1つのSQSキューに全イベントを入れ、全コンシューマーが重複なく全件読むものとする。"
      },
      {
        "key": "D",
        "text": "Kinesis Data Streamsから独自アプリでイベント本文を判別して転送する。"
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "EventBridgeはイベントパターンでイベントのsourceやdetail-type、detail内の属性を条件にターゲットへルーティングできます。独自の振り分けサーバーを管理せずに済みます。",
    "wrong_reasons": {
      "A": "SQS自体には条件ごとのマネージドなイベント配送ルールがなく、分類用のコードが別途必要です。",
      "C": "SQSは同じメッセージをすべての競合コンシューマーへ配る仕組みではありません。",
      "D": "Kinesisと独自コンシューマーでも分類はできますが、設問のサーバー管理最小化にはEventBridgeが適しています。"
    }
  },
  {
    "id": 234,
    "domain": 2,
    "subtopic": "2.2 pilot light DR",
    "theme": "backup_dr",
    "diff": 3,
    "type": "single",
    "text": "システムを別リージョンへDR対応します。障害時の復旧に備えてデータを複製し、最小限の基盤リソースを常時稼働させますが、アプリケーションを本番相当の台数で動かしておく必要はありません。該当するDR戦略はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "ウォームスタンバイ。"
      },
      {
        "key": "B",
        "text": "パイロットライト。"
      },
      {
        "key": "C",
        "text": "バックアップと復元。"
      },
      {
        "key": "D",
        "text": "マルチサイトのアクティブ/アクティブ。"
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "パイロットライトはDR先に必要最小限の基盤とデータ複製を維持し、災害発生後にアプリ層などを立ち上げて拡張します。ウォームスタンバイより通常時の維持費を抑えられます。",
    "wrong_reasons": {
      "A": "ウォームスタンバイは縮小した状態の動作可能なアプリ環境を常時維持します。設問の最小基盤のみの状態とは異なります。",
      "C": "バックアップだけで環境を復元する方式とは異なり、設問では最小限の基盤が継続稼働しています。",
      "D": "複数リージョンで本番トラフィックを同時に処理する構成ではありません。"
    }
  },
  {
    "id": 235,
    "domain": 3,
    "subtopic": "3.1 EBS gp3 performance",
    "theme": "storage",
    "diff": 2,
    "type": "single",
    "text": "データベースのEBSボリュームで、ディスク容量は十分あるもののIOPSとスループットの要件が高くなりました。保存容量を必要以上に増やさず、IOPSとスループットをそれぞれ調整したい場合、どのEBSボリュームタイプが適切ですか。",
    "choices": [
      {
        "key": "A",
        "text": "汎用SSD gp3ボリューム。"
      },
      {
        "key": "B",
        "text": "コールドHDD sc1ボリューム。"
      },
      {
        "key": "C",
        "text": "マグネティックstandardボリューム。"
      },
      {
        "key": "D",
        "text": "スループット最適化HDD st1ボリューム。"
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "EBS gp3は容量とプロビジョニングするIOPS・スループットを独立して設定できます。容量を無理に増やさず性能を調整したい場合に向いています。",
    "wrong_reasons": {
      "B": "sc1はアクセス頻度の低い連続I/O向けであり、高いDB性能要件を満たしません。",
      "C": "マグネティックは高いランダムIOPSとスループットを個別調整する用途に適しません。",
      "D": "st1は連続I/O向けHDDで、小さいランダムI/O主体のDBには向きません。"
    }
  },
  {
    "id": 236,
    "domain": 3,
    "subtopic": "3.1 EBS io2",
    "theme": "storage",
    "diff": 3,
    "type": "single",
    "text": "Nitro System搭載のEC2で大規模トランザクションDBを稼働しています。1ボリュームあたり150,000 IOPSを安定して要求され、汎用SSDの上限を超える性能が必要です。適切なEBSボリュームタイプはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "EBS io1。"
      },
      {
        "key": "B",
        "text": "EBS st1。"
      },
      {
        "key": "C",
        "text": "EBS gp3。"
      },
      {
        "key": "D",
        "text": "EBS io2。"
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "io2は高いIOPSと耐久性を重視したProvisioned IOPS SSDボリュームです。レイテンシーと性能の一貫性が重要な高負荷DBに適しています。",
    "wrong_reasons": {
      "A": "io1のIOPS上限は64,000のため、150,000 IOPSを1ボリュームで提供できません。",
      "B": "st1はシーケンシャルスループット向けHDDであり、高いランダムIOPSには対応しません。",
      "C": "gp3のプロビジョニング上限は1ボリュームあたり80,000 IOPSなので、150,000 IOPSの要件を満たせません。"
    }
  },
  {
    "id": 237,
    "domain": 3,
    "subtopic": "3.1 EFS multi-AZ",
    "theme": "storage",
    "diff": 2,
    "type": "single",
    "text": "Auto Scalingで増減するLinux EC2から、同じ画像処理用ファイルを共有して読み書きしたいと考えています。インスタンスは複数AZに分散し、POSIX互換のファイルシステムをマネージドで使用したい場合、最適なサービスはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "Amazon EBSの単一ボリュームを全AZのEC2に同時接続する。"
      },
      {
        "key": "B",
        "text": "S3バケットを各EC2のローカルディスクとしてそのままマウントする。"
      },
      {
        "key": "C",
        "text": "Amazon EFSのリージョナルファイルシステムを利用する。"
      },
      {
        "key": "D",
        "text": "各EC2のインスタンスストアへ同じファイルを個別コピーする。"
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "EFSはNFSによる共有ファイルシステムで、複数AZのEC2から同じデータにアクセスできます。EC2の台数増減に合わせて共有ファイルを扱う用途に適します。",
    "wrong_reasons": {
      "A": "EBSはAZに紐づくブロックストレージで、異なるAZをまたいだ共有NFSファイルシステムにはなりません。",
      "B": "S3はオブジェクトストレージであり、EFSのような一般的なPOSIX互換共有ファイルシステムとは異なります。",
      "D": "個別コピーでは共有更新が難しく、インスタンス停止時のデータ保持にも問題があります。"
    }
  },
  {
    "id": 238,
    "domain": 3,
    "subtopic": "3.4 NLB TCP and static IP",
    "theme": "elb_asg",
    "diff": 2,
    "type": "single",
    "text": "オンラインゲームサーバーがTCP接続を長時間維持します。独自プロトコルのTCPトラフィックを低レイテンシーで負荷分散し、ロードバランサーに固定IPアドレスを使用したい場合、適切な種類はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "Gateway Load Balancer。"
      },
      {
        "key": "B",
        "text": "Network Load Balancer。"
      },
      {
        "key": "C",
        "text": "Application Load Balancer。"
      },
      {
        "key": "D",
        "text": "Classic Load BalancerのHTTPリスナー。"
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "NLBはレイヤー4でTCPなどを負荷分散し、各有効AZで静的IPを持てます。長時間のTCP接続や固定IPを要求するクライアントに適しています。",
    "wrong_reasons": {
      "A": "GWLBは主にファイアウォール等の仮想アプライアンスへのトラフィック分散に利用されます。",
      "C": "ALBは主にHTTP/HTTPS層のルーティング用で、任意のTCPプロトコルと固定IP要件には適しません。",
      "D": "HTTPリスナーは独自TCPプロトコル用ではなく、NLBの静的IP機能も利用できません。"
    }
  },
  {
    "id": 239,
    "domain": 3,
    "subtopic": "3.2 ALB target tracking",
    "theme": "elb_asg",
    "diff": 2,
    "type": "single",
    "text": "ALB配下で多数のEC2がAPIを提供しています。トラフィック量に応じてAuto Scalingの台数を増減し、負荷分散先1台あたりのリクエスト負荷を一定の水準に保ちたい場合、どのスケーリング設定が適切ですか。",
    "choices": [
      {
        "key": "A",
        "text": "CloudTrailのイベント履歴をもとに1週間ごとに手動で台数を増やす。"
      },
      {
        "key": "B",
        "text": "EBSスナップショットの作成回数をAuto Scalingのトリガーにする。"
      },
      {
        "key": "C",
        "text": "ALBRequestCountPerTargetを使ったターゲット追跡スケーリングを設定する。"
      },
      {
        "key": "D",
        "text": "すべてのインスタンスに固定数のElastic IPを割り当てる。"
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "ターゲット追跡スケーリングではALBRequestCountPerTargetなどのメトリクスに目標値を設定できます。負荷の増減に応じてグループのキャパシティーを調整します。",
    "wrong_reasons": {
      "A": "操作履歴は実際の1台あたりリクエスト負荷に応じた自動調整にはなりません。",
      "B": "スナップショット作成回数はHTTPリクエスト負荷と対応しません。",
      "D": "IPの割り当てはリクエスト負荷に応じてインスタンス数を調整しません。"
    }
  },
  {
    "id": 240,
    "domain": 3,
    "subtopic": "3.3 DynamoDB hot partitions",
    "theme": "database",
    "diff": 3,
    "type": "single",
    "text": "DynamoDBテーブルのパーティションキーに固定値「active」を使用したところ、すべての書き込みが一部のパーティションに集中し、スロットリングが発生しています。データ量が増えても書き込みを分散するために最も重要な改善策はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "DynamoDBのポイントインタイムリカバリを有効化する。"
      },
      {
        "key": "B",
        "text": "全アイテムのSort Keyを同じ値に統一する。"
      },
      {
        "key": "C",
        "text": "テーブルのTTLを無効化する。"
      },
      {
        "key": "D",
        "text": "パーティションキーのカーディナリティーを高くして、書き込みを多くのキー値に分散する。"
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "DynamoDBはパーティションキーによりデータ・負荷を分散します。固定値のような偏ったキー設計はホットパーティションを招くため、アクセスパターンに合った高分散のキーを選びます。",
    "wrong_reasons": {
      "A": "PITRは復旧用途であり、ホットパーティションによるスロットリングを解消しません。",
      "B": "Sort Keyを同じ値にしてもパーティションキーの集中は解消しません。",
      "C": "TTLは期限切れアイテムを削除するための仕組みで、キー分布の改善ではありません。"
    }
  },
  {
    "id": 241,
    "domain": 3,
    "subtopic": "3.3 caching read hot data",
    "theme": "database",
    "diff": 2,
    "type": "single",
    "text": "RDSで扱う商品マスターのSELECTが多数発生し、DB CPU使用率が上昇しています。商品データは頻繁には更新されず、多少古いデータが短時間返ることは許容されます。低レイテンシー化とDB負荷軽減のために最も適切な設計はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "すべてのSELECTを毎回プライマリRDSへ送り、キャッシュを無効化する。"
      },
      {
        "key": "B",
        "text": "CloudTrailのログイベントを商品検索APIのレスポンスに転用する。"
      },
      {
        "key": "C",
        "text": "Amazon ElastiCacheで商品情報をキャッシュし、アプリケーションから参照する。"
      },
      {
        "key": "D",
        "text": "RDSの自動バックアップ頻度を増やしてSELECTを高速化する。"
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "更新頻度が低く、わずかな古さを許容できる情報にはキャッシュが有効です。ElastiCacheにより繰り返し発生する読み取りをDBから分離し、応答遅延とDB負荷を減らせます。",
    "wrong_reasons": {
      "A": "変更頻度の低いデータの再取得を増やし、DBへの負荷を軽減できません。",
      "B": "CloudTrailは監査ログ用で、商品情報の高速キャッシュには適しません。",
      "D": "バックアップの設定では読み取りリクエストをオフロードできません。"
    }
  },
  {
    "id": 242,
    "domain": 3,
    "subtopic": "3.2 Lambda memory CPU",
    "theme": "serverless",
    "diff": 2,
    "type": "single",
    "text": "画像をリサイズするLambda関数の実行時間が長いことが課題です。メモリ割当を増やした際、関数の実行時間が短くなる可能性がある理由として最も適切なものはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "Lambdaではメモリ割当に応じて利用できるCPU性能も増えるため。"
      },
      {
        "key": "B",
        "text": "メモリを増やすと自動的にS3のオブジェクトが圧縮されるため。"
      },
      {
        "key": "C",
        "text": "メモリを増やすと必ずLambdaの呼び出し回数が半分になるため。"
      },
      {
        "key": "D",
        "text": "メモリを増やすとLambdaの最大実行時間15分の制限がなくなるため。"
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "Lambdaに割り当てるメモリを増やすと利用可能なCPUも比例して増えるため、CPU負荷の高い処理は高速化する場合があります。実行時間と課金額のバランスを計測することが重要です。",
    "wrong_reasons": {
      "B": "S3のオブジェクトを自動圧縮する機能ではありません。",
      "C": "メモリ割当の変更はイベント発生数を減らしません。",
      "D": "メモリ増加によってLambdaの最大実行時間の上限が無制限になるわけではありません。"
    }
  },
  {
    "id": 243,
    "domain": 3,
    "subtopic": "3.5 streaming ordering replay",
    "theme": "kinesis",
    "diff": 3,
    "type": "single",
    "text": "IoT端末から大量のイベントが継続送信されています。同じ端末のイベントは同じパーティションキーで順番に送信でき、リアルタイム処理と保持期間内の再読込が必要です。最も適切なサービスはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "Amazon Kinesis Data Streams。"
      },
      {
        "key": "B",
        "text": "Amazon Data Firehose。"
      },
      {
        "key": "C",
        "text": "Amazon Kinesis Data FirehoseのS3配信履歴だけを読み直す。"
      },
      {
        "key": "D",
        "text": "Amazon SQS Standardキュー。"
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "Kinesis Data Streamsは既定でパーティションキーごとにシャードを振り分け、保持期間内に再読込できます。厳密な送信順を求める場合は同じキーのレコードをPutRecordなどで逐次送信する設計も必要です。",
    "wrong_reasons": {
      "B": "Data Firehoseは配信先へのマネージド転送が主用途で、任意のコンシューマーが一定期間のストリームを繰り返し読む用途とは異なります。",
      "C": "S3へ配信したログをバッチで再読込する方法では、ストリーム保持期間を利用したリアルタイムな再処理機能とは異なります。",
      "D": "SQS Standardはベストエフォートの順序であり、キー単位の順序保証要件を満たしません。"
    }
  },
  {
    "id": 244,
    "domain": 3,
    "subtopic": "3.5 Firehose delivery",
    "theme": "kinesis",
    "diff": 2,
    "type": "single",
    "text": "アプリから秒単位でログが大量に流れてきます。管理する処理サーバーを増やさず、ログをバッファリングしてS3へ継続配信し、必要なら形式変換も行いたい場合、どのサービスが最適ですか。",
    "choices": [
      {
        "key": "A",
        "text": "AWS DataSyncを1秒ごとのジョブで起動する。"
      },
      {
        "key": "B",
        "text": "Amazon RDSのリードレプリカをログ保存先にする。"
      },
      {
        "key": "C",
        "text": "Amazon Data FirehoseでS3を配信先に設定する。"
      },
      {
        "key": "D",
        "text": "Amazon EBSのスナップショットをリクエストごとに作成する。"
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "Amazon Data Firehoseはストリーミングデータをバッファリングし、S3などの保存先へマネージドに配信できます。変換処理や圧縮などの設定も可能です。",
    "wrong_reasons": {
      "A": "DataSyncはファイルやオブジェクトの転送・同期用で、リアルタイムのストリーム配信向けではありません。",
      "B": "RDSリードレプリカはデータベース読み取り用で、S3へのマネージドログ配信にはなりません。",
      "D": "スナップショットはブロックストレージのバックアップで、イベントログをS3へストリーム配信しません。"
    }
  },
  {
    "id": 245,
    "domain": 3,
    "subtopic": "3.4 Global Accelerator dynamic",
    "theme": "cloudfront",
    "diff": 3,
    "type": "single",
    "text": "ユーザーが世界中に分散し、動的なTCPアプリケーションへ接続します。HTTPキャッシュは利用できず、利用者の経路をAWSグローバルネットワークに早く乗せて遅延を抑えたいと考えています。適切なAWSサービスはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "Amazon CloudFrontの静的コンテンツキャッシュだけを増やす。"
      },
      {
        "key": "B",
        "text": "AWS Global Acceleratorを利用する。"
      },
      {
        "key": "C",
        "text": "Amazon S3 Transfer AccelerationでTCPサーバーへの接続を仲介する。"
      },
      {
        "key": "D",
        "text": "Route 53のTTLを無制限に増やす。"
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "AWS Global AcceleratorはAnycastの静的IPとAWSグローバルネットワークを利用して、TCP/UDPアプリケーションへの経路と可用性を改善します。コンテンツキャッシュが前提ではありません。",
    "wrong_reasons": {
      "A": "HTTPキャッシュできない任意のTCP通信を配信する仕組みではありません。",
      "C": "Transfer Accelerationは主にS3への転送を加速する機能で、任意TCPアプリへの接続経路改善には使いません。",
      "D": "DNSキャッシュを長くするだけではネットワーク経路を改善できません。"
    }
  },
  {
    "id": 246,
    "domain": 3,
    "subtopic": "3.2 cluster placement group",
    "theme": "compute",
    "diff": 3,
    "type": "single",
    "text": "複数のEC2インスタンスを利用するHPCアプリケーションで、ノード間通信の遅延が非常に重要です。同一AZのインスタンス同士をネットワーク的に近い場所にまとめたい場合、適切なEC2機能はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "EC2のSpread配置グループを使用する。"
      },
      {
        "key": "B",
        "text": "Dedicated Hostsを使用してEC2を専用ホストへ配置する。"
      },
      {
        "key": "C",
        "text": "EC2のCluster配置グループを使用する。"
      },
      {
        "key": "D",
        "text": "EC2のPartition配置グループを使用する。"
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "Cluster配置グループは同一AZ内のインスタンスを低レイテンシーで高スループットなネットワーク接続が得られるように近接配置する機能です。HPCなどに向いています。",
    "wrong_reasons": {
      "A": "Spreadはインスタンスを異なるハードウェアへ分散するもので、ノード間の低遅延化を第一目的としません。",
      "B": "専用ホストはライセンスやホスト配置の管理が主目的で、Cluster配置グループの低遅延ネットワーク最適化とは異なります。",
      "D": "Partition配置グループは物理的な障害ドメインの分離を目的とするため、低遅延を最優先して近接配置する要件とは異なります。"
    }
  },
  {
    "id": 247,
    "domain": 3,
    "subtopic": "3.5 DataSync migration",
    "theme": "migration",
    "diff": 2,
    "type": "single",
    "text": "オンプレミスのNFSサーバーにある数十TBのファイルをAmazon EFSへ移行します。既存ファイルの属性をできるだけ保持し、差分を繰り返し同期して切り替えたい場合、最も適切なAWSサービスはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "AWS Transfer FamilyでSFTPエンドポイントを提供する。"
      },
      {
        "key": "B",
        "text": "AWS Storage GatewayのFile Gatewayを利用する。"
      },
      {
        "key": "C",
        "text": "AWS DataSyncでオンプレミスNFSからEFSへの転送タスクを構成する。"
      },
      {
        "key": "D",
        "text": "AWS Snowball Edgeにデータをオフライン転送する。"
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "DataSyncはオンプレミスのNFS/SMBなどとAWSストレージ間で大量のファイルを効率的に転送し、属性や差分同期にも対応します。移行時の継続同期に適しています。",
    "wrong_reasons": {
      "A": "Transfer FamilyはSFTPなどのファイル転送エンドポイントを提供しますが、NFSからEFSへの大量の差分同期はDataSync向けです。",
      "B": "File Gatewayは主にオンプレミス環境からS3オブジェクトにアクセスする仕組みで、NFSからEFSへ同期するDataSyncとは異なります。",
      "D": "Snowball Edgeはオフライン転送に有効ですが、頻繁な差分同期とEFSへの継続移行にはDataSyncが適しています。"
    }
  },
  {
    "id": 248,
    "domain": 3,
    "subtopic": "3.4 CloudFront cache policy",
    "theme": "cloudfront",
    "diff": 2,
    "type": "single",
    "text": "CloudFrontで商品画像を配信しています。オリジンには同じ画像を求める大量のリクエストが届き、帯域と応答性能が課題です。画像のレスポンスが不要なヘッダーによってキャッシュ分割されている場合、最初に見直すべき設定はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "CloudFrontディストリビューションを削除して各ユーザーからS3へ直接接続させる。"
      },
      {
        "key": "B",
        "text": "すべての画像リクエストをオリジンへ強制転送する。"
      },
      {
        "key": "C",
        "text": "画像に毎回ランダムなクエリ文字列を付ける。"
      },
      {
        "key": "D",
        "text": "CloudFrontキャッシュポリシーでキャッシュキーに含めるヘッダーなどを必要最小限にする。"
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "キャッシュキーに不要なヘッダーやCookie、クエリ文字列を含めると同じ画像が別オブジェクト扱いになり、キャッシュヒット率が落ちます。必要なキーだけに絞って再利用性を高めます。",
    "wrong_reasons": {
      "A": "エッジキャッシュを失い、世界中の利用者の応答性能が悪化する可能性があります。",
      "B": "オリジンへのリクエスト数が増えて性能上の課題が悪化します。",
      "C": "ランダム値でキャッシュキーが変わるとキャッシュヒット率が下がります。"
    }
  },
  {
    "id": 249,
    "domain": 4,
    "subtopic": "4.2 Compute Savings Plans",
    "theme": "cost",
    "diff": 2,
    "type": "single",
    "text": "企業はEC2だけでなくAWS FargateとLambdaも継続利用しています。長期的なコンピューティング利用額にコミットして割引を得つつ、サービス構成の変更にある程度柔軟に対応したい場合、最も適切な購入オプションはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "特定AZのEC2キャパシティ予約のみ。"
      },
      {
        "key": "B",
        "text": "Compute Savings Plans。"
      },
      {
        "key": "C",
        "text": "RDS Reserved Instances。"
      },
      {
        "key": "D",
        "text": "S3 Intelligent-Tiering。"
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "Compute Savings Plansは一定の時間当たり使用額にコミットすることで、対応するEC2・Fargate・Lambdaの使用料金を割引できます。コンピューティングサービス間の柔軟性を持てます。",
    "wrong_reasons": {
      "A": "On-Demand Capacity Reservationはキャパシティを確保する仕組みで、FargateやLambdaへの共通利用割引にはなりません。",
      "C": "RDS向けの予約割引で、EC2・Fargate・Lambdaをまとめたコンピューティング割引ではありません。",
      "D": "オブジェクトのストレージ階層を最適化する仕組みで、コンピューティング費用には適用されません。"
    }
  },
  {
    "id": 250,
    "domain": 4,
    "subtopic": "4.2 EC2 Spot batch",
    "theme": "cost",
    "diff": 2,
    "type": "single",
    "text": "大量の動画ファイルを並列変換するバッチ処理があります。処理は途中で停止しても再開可能で、短時間の中断を許容します。必要なコンピューティングコストを大きく削減する方法はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "すべての処理結果をS3 One Zone-IAへ移動してCPU料金をゼロにする。"
      },
      {
        "key": "B",
        "text": "EC2 Spot Instancesを処理ワーカーに使い、中断時の再試行を設計する。"
      },
      {
        "key": "C",
        "text": "すべてのワーカーを最大サイズのEC2 On-Demandインスタンスに固定する。"
      },
      {
        "key": "D",
        "text": "すべてのバッチをRDSマルチAZで実行する。"
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "Spot InstancesはAWSの未使用EC2キャパシティを低価格で利用できます。途中中断に耐えられるバッチやキュー駆動ワーカーに適し、再実行やチェックポイントを組み込みます。",
    "wrong_reasons": {
      "A": "ストレージクラスを変更してもEC2のコンピューティング課金をなくせません。",
      "C": "オンデマンドのみで最大サイズを維持する方法は中断耐性をコスト削減に活かせません。",
      "D": "RDSマルチAZはデータベースの高可用性機能で、動画バッチの安価な計算資源ではありません。"
    }
  },
  {
    "id": 251,
    "domain": 4,
    "subtopic": "4.4 avoid NAT for S3",
    "theme": "cost",
    "diff": 2,
    "type": "single",
    "text": "プライベートサブネットのEC2が、同一リージョンのS3バケットから毎日大量のオブジェクトをダウンロードしています。現在はNATゲートウェイ経由で通信し、そのデータ処理料金を減らしたいと考えています。最も適切な見直しはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "S3 Gateway型VPCエンドポイントを作成し、該当ルートテーブルへ関連付ける。"
      },
      {
        "key": "B",
        "text": "S3バケットを同じリージョンの別AZへ移動する。"
      },
      {
        "key": "C",
        "text": "NATゲートウェイの数を増やして全通信を均等に分散する。"
      },
      {
        "key": "D",
        "text": "S3からEC2への通信をすべてCloudFront経由に変更する。"
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "S3 Gateway型VPCエンドポイントならS3向けトラフィックがNATゲートウェイを通らなくなります。Gateway型エンドポイント自体に時間料金・データ処理料金はありません。",
    "wrong_reasons": {
      "B": "S3はバケットを特定AZに移すサービスではなく、NAT通信料金の解消にはなりません。",
      "C": "NATデータ処理量自体が減らないため、目的とするS3通信費用の削減になりません。",
      "D": "VPC内部から大量にS3を取得する処理ではGateway型エンドポイントの方が直接的な解決策です。"
    }
  },
  {
    "id": 252,
    "domain": 4,
    "subtopic": "4.3 RDS RI steady",
    "theme": "cost",
    "diff": 2,
    "type": "single",
    "text": "本番用のRDSデータベースが24時間365日ほぼ一定のサイズで稼働しており、今後1年以上は利用する予定です。DBインスタンス料金を削減するためにまず検討すべきものはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "S3 Requester PaysをRDSへ適用する。"
      },
      {
        "key": "B",
        "text": "毎日稼働中のRDSを削除してスナップショットから復元する。"
      },
      {
        "key": "C",
        "text": "RDS Reserved Instancesを購入し、継続稼働の利用額に割引を適用する。"
      },
      {
        "key": "D",
        "text": "EC2 Spot InstancesをRDSの課金方式として指定する。"
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "継続して利用するRDSインスタンスにはRDS Reserved Instancesの予約割引が有効です。稼働パターンが安定している場合に、従量課金より費用を抑えられます。",
    "wrong_reasons": {
      "A": "Requester PaysはS3のリクエスト/データ転送の支払い方式で、RDS DBインスタンス料金には適用できません。",
      "B": "本番サービスの常時稼働要件を満たさず、毎日の復元も運用負担になります。",
      "D": "RDS DBインスタンスの購入オプションとしてEC2 Spotは使用できません。"
    }
  },
  {
    "id": 253,
    "domain": 4,
    "subtopic": "4.3 DynamoDB on-demand",
    "theme": "cost",
    "diff": 2,
    "type": "single",
    "text": "DynamoDBテーブルにはほぼアクセスがない日もありますが、キャンペーン開催中は短時間にアクセスが急増します。事前のトラフィック予測が難しく、キャパシティー計画の運用負担を下げたい場合、適切な課金モードはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "DynamoDBをS3 Glacier Deep Archiveへ置き換える。"
      },
      {
        "key": "B",
        "text": "オンデマンドキャパシティーモード。"
      },
      {
        "key": "C",
        "text": "常に最大ピーク分のプロビジョンドキャパシティーを固定する。"
      },
      {
        "key": "D",
        "text": "すべてのアクセスをDynamoDBのバックアップから復元して処理する。"
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "DynamoDBオンデマンドモードはリクエスト量に応じた課金で、予測が難しい変動負荷に適しています。利用状況によってはプロビジョンドの方が安いこともあるため、実負荷を確認します。",
    "wrong_reasons": {
      "A": "アーカイブオブジェクトストレージでは高速なKVSアクセス要件を満たせません。",
      "C": "低負荷の時間帯にも最大ピーク分を維持するため、予測不能な波のある負荷では費用が増えやすくなります。",
      "D": "バックアップ復元は通常のオンライン読み書き処理の代替にはなりません。"
    }
  },
  {
    "id": 254,
    "domain": 4,
    "subtopic": "4.1 gp2 to gp3 cost",
    "theme": "storage",
    "diff": 2,
    "type": "single",
    "text": "EC2に接続されたgp2 EBSボリュームを利用しています。必要な容量は変えずに既存のIOPSとスループットを維持できると確認済みです。一般に月額のボリューム費用を抑えるため、先に検討したい変更はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "gp2の容量を倍増して性能を上げる。"
      },
      {
        "key": "B",
        "text": "ボリュームをio2にして最高性能を設定する。"
      },
      {
        "key": "C",
        "text": "ボリュームをインスタンスストアに移して永続性を失う。"
      },
      {
        "key": "D",
        "text": "ボリュームタイプをgp3へ変更し、必要な性能値を設定する。"
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "gp3はgp2より容量単価が低い設定が一般的で、IOPSとスループットを容量から独立して調整できます。同じ性能を満たせるならコスト最適化の候補です。",
    "wrong_reasons": {
      "A": "容量を増やすと通常はストレージ課金も増え、同じ必要性能を安く提供する目的に反します。",
      "B": "高いProvisioned IOPSが必要ないのにio2へ移行すると費用が上がり得ます。",
      "C": "インスタンスストアは永続EBSの代替として単純に置き換えられず、停止時のデータ保持要件を損ねます。"
    }
  },
  {
    "id": 255,
    "domain": 4,
    "subtopic": "4.1 S3 intelligent tiering",
    "theme": "storage",
    "diff": 2,
    "type": "single",
    "text": "大量のS3オブジェクトを長期間保持します。オブジェクトごとのアクセス頻度は予測できず、時間の経過とともに変化します。取り出し遅延を発生させない階層だけを使いながら、階層移動を自動化したい場合、最も適切なストレージクラスはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "S3 Intelligent-Tieringの即時アクセス階層を利用し、自動階層化させる。"
      },
      {
        "key": "B",
        "text": "全オブジェクトをS3 One Zone-IAへ固定してAZ障害耐性を高める。"
      },
      {
        "key": "C",
        "text": "すべてのオブジェクトを永続的にS3 Standardだけで維持する。"
      },
      {
        "key": "D",
        "text": "S3 Glacier Deep Archiveへ最初からすべて保存する。"
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "Intelligent-Tieringはアクセスパターンを監視して対象オブジェクトを低頻度アクセス階層へ自動移動します。アーカイブ用の任意オプションを有効にしなければ、標準/低頻度の即時アクセス階層で利用できます。",
    "wrong_reasons": {
      "B": "One Zone-IAは1つのAZに格納されるため、AZ障害耐性を高めるという説明自体が誤りです。",
      "C": "アクセス頻度が下がったオブジェクトも自動で低コスト階層へ移動されません。",
      "D": "Deep Archiveはアーカイブ取り出しに時間が必要なため、即時アクセスの要件に反します。"
    }
  },
  {
    "id": 256,
    "domain": 4,
    "subtopic": "4.1 deep archive long retention",
    "theme": "storage",
    "diff": 2,
    "type": "single",
    "text": "法令上の理由で監査記録を7年間保存します。日常的な取り出しは不要で、必要時に1日以上の復元時間がかかっても構いません。データを長期に低コストで保管する選択肢はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "S3 One Zone-IA。"
      },
      {
        "key": "B",
        "text": "EBS Provisioned IOPS io2。"
      },
      {
        "key": "C",
        "text": "S3 Standard。"
      },
      {
        "key": "D",
        "text": "S3 Glacier Deep Archive。"
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "S3 Glacier Deep Archiveは非常に低頻度アクセスの長期保管に適したストレージクラスです。復元に時間がかかるため、要件が日単位の取り出しを許容する場合に向いています。",
    "wrong_reasons": {
      "A": "AZ障害の耐性が低く、アクセス不要な長期保存ではより低コストのアーカイブ階層が適しています。",
      "B": "高性能ブロックストレージは長期アーカイブに対して不要な性能と費用がかかります。",
      "C": "日常的にアクセスしない長期アーカイブには、より安価なアーカイブ向けクラスがあります。"
    }
  },
  {
    "id": 257,
    "domain": 4,
    "subtopic": "4.2 AWS Budgets threshold",
    "theme": "cost",
    "diff": 1,
    "type": "single",
    "text": "AWSの月額費用に上限を設定しており、今月の支出や予測費用が指定額を超えそうな場合に担当者へ通知したいと考えています。最も直接的なAWSサービスはどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "AWS Trusted Advisorのコスト最適化チェックを確認する。"
      },
      {
        "key": "B",
        "text": "AWS Cost Anomaly Detectionで普段と異なる支出を検知する。"
      },
      {
        "key": "C",
        "text": "AWS Budgetsで予算額と通知しきい値を設定する。"
      },
      {
        "key": "D",
        "text": "AWS Cost Explorerの利用傾向レポートのみを確認する。"
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "AWS Budgetsは月額予算と実績・予測に対するしきい値通知を構成できます。Cost Explorerは利用傾向分析に便利ですが、予算の監視通知にはBudgetsが直接的です。",
    "wrong_reasons": {
      "A": "Trusted Advisorは節約の推奨事項を提供しますが、設定した月額予算の超過予測アラートにはBudgetsが適しています。",
      "B": "Cost Anomaly Detectionは異常支出の検出に役立ちますが、事前に定めた固定月額予算の実績・予測を監視する用途とは異なります。",
      "D": "Cost Explorerは費用の分析向けですが、月次のしきい値や予測超過通知を直接設定するにはBudgetsが適しています。"
    }
  },
  {
    "id": 258,
    "domain": 4,
    "subtopic": "4.4 CloudFront origin costs",
    "theme": "cost",
    "diff": 2,
    "type": "single",
    "text": "画像配信サイトの利用者が海外にも多く、S3オリジンに同じ画像へのGETリクエストが大量に発生しています。利用者の応答を速くしつつ、オリジンへのデータ転送とリクエスト数を減らす施策はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "世界各地の利用者ごとにEC2から同じ画像を再取得する。"
      },
      {
        "key": "B",
        "text": "CloudTrailでオブジェクトアクセスをすべてログに記録するだけにする。"
      },
      {
        "key": "C",
        "text": "CloudFrontディストリビューションを設け、画像をエッジキャッシュする。"
      },
      {
        "key": "D",
        "text": "S3のバージョニングを無効化して同じURLのキャッシュを消す。"
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "CloudFrontはコンテンツをエッジロケーションにキャッシュし、繰り返しの要求をS3へ送らずに応答できます。オリジンへの転送量とリクエストを減らせる場合があります。",
    "wrong_reasons": {
      "A": "オリジンへのアクセスが増え、コストと応答遅延の改善につながりにくい方法です。",
      "B": "ログ取得では配信のキャッシュが行われず、オリジンへのGET回数は減りません。",
      "D": "バージョニング設定はエッジキャッシュによる転送最適化の代わりにはなりません。"
    }
  },
  {
    "id": 259,
    "domain": 4,
    "subtopic": "4.4 NAT local AZ routing",
    "theme": "cost",
    "diff": 3,
    "type": "multi",
    "count": 2,
    "text": "AZ-AとAZ-Bのプライベートサブネットにアプリケーションを配置しています。どちらのAZもAZ-Aにある1つのNATゲートウェイを経由して、一般のインターネット上の外部APIへ通信しています。AZ障害耐性を高めつつ不要なAZ間通信料金を減らすための構成を2つ選んでください。",
    "choices": [
      {
        "key": "A",
        "text": "インターネットゲートウェイを各プライベートサブネットへ直接関連付ける。"
      },
      {
        "key": "B",
        "text": "各AZのプライベートサブネットのデフォルトルートを、同じAZにあるNATゲートウェイへ向ける。"
      },
      {
        "key": "C",
        "text": "プライベートサブネットからの外部API通信をS3 Gateway型VPCエンドポイントへ送る。"
      },
      {
        "key": "D",
        "text": "NATゲートウェイをAZ-Aだけに残し、AZ-Bの通信は必ずAZ-Aへ流す。"
      },
      {
        "key": "E",
        "text": "AZ-BのパブリックサブネットにもNATゲートウェイを配置する。"
      }
    ],
    "correct": [
      "B",
      "E"
    ],
    "explanation": "NATゲートウェイはAZごとに配置し、各AZのプライベートサブネットを同じAZのNATへルーティングすると、クロスAZ通信費用を減らしつつAZ障害時の影響を小さくできます。ただしNATの時間料金は増えるため、総額も比較します。",
    "wrong_reasons": {
      "A": "インターネットゲートウェイはVPCに接続するもので、プライベートインスタンスのNATとしてサブネットへ関連付けられません。",
      "C": "S3用のGateway型エンドポイントは一般のインターネット上のAPIへ接続する経路にはなりません。",
      "D": "AZ-A障害時にAZ-Bのアウトバウンド通信も失敗し、AZをまたぐトラフィックも維持されます。"
    }
  },
  {
    "id": 260,
    "domain": 4,
    "subtopic": "4.2 EC2 off-hours scheduling",
    "theme": "compute",
    "diff": 2,
    "type": "single",
    "text": "開発検証用のEC2は平日の勤務時間だけ使い、夜間と休日は停止してよいことが確認されています。永続ディスクは残す必要がありますが、計算資源の費用はできるだけ削減したい場合、最も適切な対応はどれですか。",
    "choices": [
      {
        "key": "A",
        "text": "EventBridge Schedulerなどで勤務時間外にEC2を停止し、翌営業日に開始する。"
      },
      {
        "key": "B",
        "text": "使用しない間もEC2を起動し続け、CPU使用率だけ下げる。"
      },
      {
        "key": "C",
        "text": "EBSボリュームを残さず全削除し、毎朝手動で環境を作り直す。"
      },
      {
        "key": "D",
        "text": "停止せずにEC2のインスタンスタイプを毎分切り替える。"
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "EC2の停止中は多くの一般的なインスタンス料金が発生しなくなります。一方EBSなどの保存費用は継続するため、用途に応じて停止・起動スケジュールを設定します。",
    "wrong_reasons": {
      "B": "起動中のEC2は処理がほぼなくてもインスタンス料金が発生します。",
      "C": "永続ディスクを残すという要件に反し、復旧作業も増えます。",
      "D": "毎分のサイズ変更は非現実的であり、停止可能な時間帯の計算料金を直接なくせません。"
    }
  }
]
);
