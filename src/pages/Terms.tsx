import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="max-w-xl mx-auto px-6 py-10">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <h2
            className="text-2xl font-semibold text-foreground mb-2"
            style={{ fontFamily: '"Libre Bodoni", Georgia, serif' }}
          >
            Terms of Service
          </h2>
          <p className="text-xs text-foreground/40 mb-8">Last updated: February 1, 2026</p>

          <div className="space-y-6 text-sm text-foreground/70 leading-relaxed">
            <section>
              <h3 className="text-base font-medium text-foreground/90 mb-2">1. Acceptance of Terms</h3>
              <p>
                By accessing or using Wholelicity ("the Service"), you agree to be bound by these Terms
                of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h3 className="text-base font-medium text-foreground/90 mb-2">2. Description of Service</h3>
              <p>
                Wholelicity is a Scripture study platform that provides AI-guided Bible exploration,
                reading tools, and personalized spiritual growth features. The Service includes
                conversation with Sophia (an AI guide), Bible reading and cross-referencing tools,
                insight saving, and personalized recommendations.
              </p>
            </section>

            <section>
              <h3 className="text-base font-medium text-foreground/90 mb-2">3. User Accounts</h3>
              <p>
                To access certain features, you may need to create an account. You are responsible
                for maintaining the confidentiality of your account credentials and for all activities
                that occur under your account. You agree to provide accurate and complete information
                when creating your account.
              </p>
            </section>

            <section>
              <h3 className="text-base font-medium text-foreground/90 mb-2">4. Acceptable Use</h3>
              <p className="mb-2">You agree not to:</p>
              <ul className="list-disc list-inside space-y-1 text-foreground/60">
                <li>Use the Service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Interfere with or disrupt the Service or its infrastructure</li>
                <li>Reproduce, duplicate, or resell any part of the Service without permission</li>
                <li>Use automated systems to access the Service in a manner that exceeds reasonable use</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-medium text-foreground/90 mb-2">5. AI-Generated Content</h3>
              <p>
                Sophia and other AI features provide guidance and commentary intended to support
                your study of Scripture. AI-generated responses are not a substitute for professional
                theological counsel, pastoral care, or mental health services. The Service does not
                represent any specific denomination or church authority.
              </p>
            </section>

            <section>
              <h3 className="text-base font-medium text-foreground/90 mb-2">6. Intellectual Property</h3>
              <p>
                All content, design, and technology comprising the Service are the property of
                Wholelicity and its licensors. Scripture texts are used under their respective
                licenses. Your saved insights and personal data remain yours.
              </p>
            </section>

            <section>
              <h3 className="text-base font-medium text-foreground/90 mb-2">7. Privacy</h3>
              <p>
                Your use of the Service is also governed by our Privacy Policy. We collect and use
                your information as described therein. Conversation data with Sophia may be used to
                improve the Service but will not be shared with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h3 className="text-base font-medium text-foreground/90 mb-2">8. Disclaimers</h3>
              <p>
                The Service is provided "as is" and "as available" without warranties of any kind,
                either express or implied. We do not guarantee that the Service will be uninterrupted,
                error-free, or that AI-generated content will be accurate or complete.
              </p>
            </section>

            <section>
              <h3 className="text-base font-medium text-foreground/90 mb-2">9. Limitation of Liability</h3>
              <p>
                To the fullest extent permitted by law, Wholelicity shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising from your
                use of the Service.
              </p>
            </section>

            <section>
              <h3 className="text-base font-medium text-foreground/90 mb-2">10. Changes to Terms</h3>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of
                material changes through the Service. Your continued use of the Service after
                changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h3 className="text-base font-medium text-foreground/90 mb-2">11. Contact</h3>
              <p>
                If you have any questions about these Terms of Service, please reach out to us
                through the app or at our support channels.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
