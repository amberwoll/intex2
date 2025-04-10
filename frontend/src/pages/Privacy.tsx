import './Privacy.css';
import { NavigationBar } from '../components/UniversalLayout/NavigationBar';
import AuthorizeView from '../components/AuthorizeView';
import { Footer } from '../components/MoviePage/Footer';
const Privacy: React.FC = () => {
  return (
    <AuthorizeView requiredPrivilegeLevel={0}>
      <div>
        <NavigationBar />;
        <div className="privacy-wrapper">
          <h1 className="text-3xl font-bold mb-4">CineNiche Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-6">
            <strong>Effective Date:</strong> April 11, 2025
          </p>

          <p className="mb-6">
            CineNiche is a streaming platform dedicated to delivering cult
            classics, international cinema, indie films, and niche
            documentaries. This privacy policy explains how CineNiche collects,
            uses, and protects the personal data you provide when using our
            website and streaming services.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">Topics:</h2>
          <ul>
            <li>What data do we collect?</li>
            <li>How do we collect your data?</li>
            <li>How will we use your data?</li>
            <li>How do we store your data?</li>
            <li>Marketing</li>
            <li>What are your data protection rights?</li>
            <li>What are cookies?</li>
            <li>How do we use cookies?</li>
            <li>What types of cookies do we use?</li>
            <li>How to manage your cookies</li>
            <li>Privacy policies of other websites</li>
            <li>Changes to our privacy policy</li>
            <li>How to contact us</li>
            <li>How to contact the appropriate authorities</li>
          </ul>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-xl font-semibold mt-8 mb-2">
            What data do we collect?
          </h2>
          <ul>
            <li>
              Personal identification information (e.g., name, age, gender,
              phone, email, city/state, zip, etc.)
            </li>
            <li>Movie ratings</li>
            <li>Cookies and usage data</li>
          </ul>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-xl font-semibold mt-8 mb-2">
            How do we collect your data?
          </h2>
          <ul>
            <li>Register for a CineNiche account</li>
            <li>Watch or rate a movie</li>
            <li>Submit a review or feedback</li>
            <li>Interact with personalized content or recommendations</li>
            <li>Use or view our website or apps via your browser or device</li>
          </ul>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-xl font-semibold mt-8 mb-2">
            How will we use your data?
          </h2>
          <ul>
            <li>Deliver and improve your streaming experience</li>
            <li>Provide personalized movie recommendations</li>
            <li>Manage your account and preferences</li>
            <li>Improve site functionality and security</li>
          </ul>
          <p>
            If you agree, CineNiche may share limited, anonymized data to
            enhance recommendations and improve platform performance.
          </p>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-xl font-semibold mt-8 mb-2">
            How do we store your data?
          </h2>
          <p>
            CineNiche securely stores your data on encrypted servers hosted
            within the EU and the US, protected with industry-standard access
            controls and other regular security updates.
          </p>
          <p>
            We retain your account and usage data for as long as your account is
            active. If you delete your account, we will remove personal data
            within 30 days, unless otherwise required by law.
          </p>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-xl font-semibold mt-8 mb-2">Marketing</h2>
          <p>
            We will not share your data with third parties for marketing
            purposes without your explicit consent.
          </p>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-xl font-semibold mt-8 mb-2">
            What are your data protection rights?
          </h2>
          <p>
            CineNiche would like to make sure you’re fully aware of your rights.
            Every user is entitled to:
          </p>
          <ul>
            <li>
              The right to access – You can request copies of your personal
              data.
            </li>
            <li>
              The right to rectification – Request correction of any inaccurate
              or incomplete data.
            </li>
            <li>
              The right to erasure – Request deletion of your data under certain
              conditions.
            </li>
            <li>
              The right to restrict processing – Ask us to limit how we use your
              data.
            </li>
            <li>
              The right to object to processing – Object to how we use your data
              for specific purposes.
            </li>
            <li>
              The right to data portability – Request transfer of your data to
              another organization or to you.
            </li>
          </ul>
          <p>
            To exercise any of these rights, email us at{' '}
            <a
              href="mailto:privacy@cineniche.com"
              className="text-blue-600 underline"
            >
              privacy@cineniche.com
            </a>
            . We will respond within one week.
          </p>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-xl font-semibold mt-8 mb-2">What are cookies?</h2>
          <p>
            Cookies are small text files placed on your device to collect
            standard internet log data and visitor behavior information. When
            you visit CineNiche, we may collect data automatically through
            cookies or similar technologies. For more details, visit{' '}
            <a
              href="https://www.allaboutcookies.org"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              allaboutcookies.org
            </a>
            .
          </p>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-xl font-semibold mt-8 mb-2">
            How do we use cookies?
          </h2>
          <ul>
            <li>Keep you signed in</li>
            <li>Remember your viewing preferences</li>
            <li>Enable personalized movie recommendations</li>
            <li>Analyze platform usage and improve functionality</li>
          </ul>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-xl font-semibold mt-8 mb-2">
            What types of cookies do we use?
          </h2>
          <ul>
            <li>
              <strong>Functionality cookies:</strong> Remember your information
            </li>
            <li>
              <strong>Analytics cookies:</strong> Understand how users interact
              with our site
            </li>
          </ul>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-xl font-semibold mt-8 mb-2">
            How to manage cookies
          </h2>
          <p>
            You can set your browser to refuse cookies or delete existing ones.
            However, disabling cookies may affect functionality and
            personalization on CineNiche.
          </p>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-xl font-semibold mt-8 mb-2">
            Privacy policies of other websites
          </h2>
          <p>Our privacy policy applies only to our own platform.</p>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-xl font-semibold mt-8 mb-2">
            Changes to our privacy policy
          </h2>
          <p>
            CineNiche regularly reviews and updates this policy. All changes
            will be posted on this page. This version was last updated on April
            11, 2025.
          </p>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-xl font-semibold mt-8 mb-2">How to contact us</h2>
          <ul>
            <li>
              📧 Email:{' '}
              <a
                href="mailto:privacy@cineniche.com"
                className="text-blue-600 underline"
              >
                privacy@cineniche.com
              </a>
            </li>
            <li>📞 Phone: (801) 610-7788</li>
            <li>📬 Address: 35 N 300 W, Ste 201, Provo, UT 84606</li>
          </ul>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-xl font-semibold mt-8 mb-2">
            How to contact the appropriate authorities
          </h2>
          <p>
            If you wish to report a complaint or feel that CineNiche has not
            addressed your concerns adequately, you may contact your local data
            protection authority or:
          </p>
          <ul>
            <li>
              <strong>Federal Trade Commission (FTC)</strong>
            </li>
            <li>📞 Phone: 1-877-FTC-HELP (1-877-382-4357)</li>
            <li>
              📬 Address: Federal Trade Commission, 600 Pennsylvania Avenue, NW,
              Washington, DC 20580
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </AuthorizeView>
  );
};

export default Privacy;
