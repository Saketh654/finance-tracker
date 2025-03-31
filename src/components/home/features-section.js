import Features from "./features"
import "../../styles/home.css";
function FeaturesSection(){

    const features = [
        {
            icon: "📝",
            title: "Transaction Tracking",
            description: "Easily add and categorize your income and expenses. Import transactions automatically from your bank or add them manually."
        },
        {
            icon: "📊",
            title: "Budget Management",
            description: "Create custom budgets for different categories and track your spending against your budget limits in real-time."
        },
        {
            icon: "📈",
            title: "Financial Reports",
            description: "Generate detailed reports and visualizations to understand your spending habits and financial trends over time."
        },
        {
            icon: "🔔",
            title: "Smart Alerts",
            description: "Get notified when you're approaching budget limits or when unusual spending patterns are detected."
        },
        {
            icon: "🎯",
            title: "Financial Goals",
            description: "Set savings goals and track your progress with visual indicators and achievement milestones."
        },
        {
            icon: "🔒",
            title: "Secure & Private",
            description: "Your financial data is encrypted and securely stored. We never share your information with third parties."
        }
    ]
    return(
        <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Powerful Financial Tools</h2>
            <p>Everything you need to manage your personal finances in one place</p>
          </div>
           <div className="features-grid">
          {features.map((feature,index) => {
            return (
                     <Features key={index} icon={feature.icon} title={feature.title} description={feature.description}/>
            );
          })}
           </div>
          {/* <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Transaction Tracking</h3>
              <p>Easily add and categorize your income and expenses. Import transactions automatically from your bank or add them manually.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Budget Management</h3>
              <p>Create custom budgets for different categories and track your spending against your budget limits in real-time.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Financial Reports</h3>
              <p>Generate detailed reports and visualizations to understand your spending habits and financial trends over time.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Smart Alerts</h3>
              <p>Get notified when you're approaching budget limits or when unusual spending patterns are detected.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Financial Goals</h3>
              <p>Set savings goals and track your progress with visual indicators and achievement milestones.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your financial data is encrypted and securely stored. We never share your information with third parties.</p>
            </div>
          </div> */}
        </div>
      </section>
    )
}

export default FeaturesSection;